export type MotionCleanup = () => void;

type PluginRegistry = {
  gsapRegistered: boolean;
  scrollTriggerRegistered: boolean;
};

const registry: PluginRegistry = {
  gsapRegistered: false,
  scrollTriggerRegistered: false,
};

export function markGsapReady() {
  if (registry.gsapRegistered && registry.scrollTriggerRegistered) {
    return false;
  }

  registry.gsapRegistered = true;
  registry.scrollTriggerRegistered = true;
  return true;
}

export function getGsapRegistrationState(): PluginRegistry {
  return { ...registry };
}

export function resetGsapRegistrationForTests() {
  registry.gsapRegistered = false;
  registry.scrollTriggerRegistered = false;
}
