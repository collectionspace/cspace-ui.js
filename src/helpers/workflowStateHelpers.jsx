export const isLocked = state => state === 'locked';

export const isReplicated = state => state && state.includes('replicated');
