// EventEmitter Class
export class EventEmitter<T> {
  private maxListeners: number = 10
  private onPointers: Map<string, Array<i32>> = new Map<string, Array<i32>>()
  private oncePointers: Map<string, Array<i32>> = new Map<string, Array<i32>>()
  constructor() {}
  emit(event: string, data: T): void {
    if (this.onPointers.has(event) || this.oncePointers.has(event)) {
      const onPtrs = this.onPointers.get(event)
      const oncePtrs = this.oncePointers.get(event)
      for (let i = 0; i < onPtrs.length; i++) {
        call_indirect(onPtrs[i], data)
      }
      for (let i = 0; i < oncePtrs.length; i++) {
          call_indirect(oncePtrs[i], data)
          oncePtrs.splice(i, i + 1)
      }
    }
  }
  on(event: string, callback: (data: T) => void): void {
    if (!this.onPointers.has(event)) {
      this.onPointers.set(event, [load<i32>(changetype<usize>(callback))])
    } else {
      const ptrs = this.onPointers.get(event)
      if (ptrs.length + this.oncePointers.get(event).length > this.maxListeners) {
        throw new Error(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${ptrs.length} ${event} listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit`)
      }
      ptrs.push(load<i32>(changetype<usize>(callback)))
      this.onPointers.set(event, ptrs)
    }
  }
  addListener(event: string, callback: (data: T) => void): void {
      if (!this.onPointers.has(event)) {
        this.onPointers.set(event, [load<i32>(changetype<usize>(callback))])
      } else {
        const ptrs = this.onPointers.get(event)
        if (ptrs.length + this.oncePointers.get(event).length > this.maxListeners) {
          throw new Error(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${ptrs.length} ${event} listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit`)
        }
        ptrs.push(load<i32>(changetype<usize>(callback)))
        this.onPointers.set(event, ptrs)
      }
  }
  once(event: string, callback: (data: T) => void): void {
      if (!this.oncePointers.has(event)) {
        this.oncePointers.set(event, [load<i32>(changetype<usize>(callback))])
      } else {
        const ptrs = this.oncePointers.get(event)
        if (ptrs.length + this.onPointers.get(event).length > this.maxListeners) {
          throw new Error(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${ptrs.length} ${event} listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit`)
        }
        ptrs.push(load<i32>(changetype<usize>(callback)))
        this.oncePointers.set(event, ptrs)
      }
  }
  prependListener(event: string, callback: (data: T) => void): void {
      if (!this.onPointers.has(event)) {
        this.onPointers.set(event, [load<i32>(changetype<usize>(callback))])
      } else {
        const ptrs = this.onPointers.get(event)
        if (ptrs.length  + this.oncePointers.get(event).length > this.maxListeners) {
          throw new Error(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${ptrs.length} ${event} listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit`)
        }
        ptrs.push(load<i32>(changetype<usize>(callback)))
        this.onPointers.set(event, ptrs)
      }
  }
  prependOnceListener(event: string, callback: (data: T) => void): void {
      if (!this.oncePointers.has(event)) {
        this.oncePointers.set(event, [load<i32>(changetype<usize>(callback))])
      } else {
        const ptrs = this.onPointers.get(event)
        if (ptrs.length + this.onPointers.get(event).length > this.maxListeners) {
          throw new Error(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${ptrs.length} ${event} listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit`)
        }
        ptrs.push(load<i32>(changetype<usize>(callback)))
        this.oncePointers.set(event, ptrs)
      }
  }
  removeListener(event: string): void {
      this.onPointers.delete(event)
      this.oncePointers.delete(event)
  }
  removeAllListeners(): void {
      this.onPointers.clear()
      this.oncePointers.clear()
  }
  eventNames(): Array<string> {
      return this.onPointers.keys()
  }
  getMaxListeners(): number {
    return this.maxListeners
  }
  setMaxListeners(n: number): void {
    this.maxListeners = n
  }
}