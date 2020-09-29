declare type CombinedProps<
  S extends (...args: any[]) => any,
  P extends {}
> = ReturnType<S> & ReturnType<P>

declare interface Dict<T> {
  [k: string]: T
}

declare module 'chartjs-plugin-streaming'
