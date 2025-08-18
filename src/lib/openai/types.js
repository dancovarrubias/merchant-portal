export const MessageRole = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
};

export const ThreadStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  STREAMING: 'streaming',
  ERROR: 'error',
};

export const RunStatus = {
  QUEUED: 'queued',
  IN_PROGRESS: 'in_progress',
  REQUIRES_ACTION: 'requires_action',
  CANCELLING: 'cancelling',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
};