export const isDeprecated = (state) => !!state && state.includes('deprecated');

export const isLocked = (state) => !!state && state.includes('locked');

export const isReplicated = (state) => !!state && state.includes('replicated');
