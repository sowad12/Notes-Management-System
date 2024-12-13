export interface Status {
    code: number
    message: string
  }

export interface RootList<T> {
    data: T[]
    status: Status
  }
  export interface Root<T> {
    data: T
    status: Status
  }
 