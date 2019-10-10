export function cm2tn (base: string) {
  return {
    appear: base + '-appear',
    appearActive: base + '-active-appear',
    enter: base + '-enter',
    enterActive: base + '-active-enter',
    enterDone: base + '-done-enter',
    exit: base + '-exit',
    exitActive: base + '-active-exit',
    exitDone: base + '-done-exit',
  }
}

export interface InjectProps {
  token: string
  from: string
  channel: BroadcastChannel
  version?: string
  env?: string
}