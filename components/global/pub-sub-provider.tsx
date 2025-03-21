'use client'

import { useSiteStore } from '@/stores/use-site-store';
import { useIsomorphicLayoutEffect } from 'react-use';
import { usePubSub } from 'usepubsub'

export const PubSubProvider = () => {
  const setPublish = useSiteStore((state) => state.setPublish);
  const setSubscribe = useSiteStore((state) => state.setSubscribe);
  
  const { publish, subscribe } = usePubSub();

  useIsomorphicLayoutEffect(() => {
    setPublish(publish);
    setSubscribe(subscribe);
  }, [publish, subscribe])

  return null;
}