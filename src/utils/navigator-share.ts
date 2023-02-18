type ShareOptions = { title: string; text: string; url?: string };
type Callback = (err: unknown | null, result?: any) => void;

export const navigatorShare = async (options: ShareOptions, cb?: Callback) => {
  try {
    await navigator.share(options);
  } catch (err) {
    console.error(`Error sharing: ${err}`);
    cb?.(err);
  }
};
