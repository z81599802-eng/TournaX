#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  husky_skip_init=1
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) - $1"
  }
  readonly husky_skip_init
  export husky_skip_init

  if [ "${0##*/}" = "husky.sh" ]; then
    return
  fi
  debug "calling hook: $0"
  . "${0%/*}/husky.sh"
fi
