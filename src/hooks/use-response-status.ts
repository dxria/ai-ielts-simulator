import { useTranslations } from 'next-intl';

import { enqueueSnackbar } from 'notistack';

type Paths<Schema, Path extends string = ''> = Schema extends string
    ? Path
    : Schema extends object
      ? {
            [K in keyof Schema & string]: Paths<
                Schema[K],
                `${Path}${Path extends '' ? '' : '.'}${K}`
            >;
        }[keyof Schema & string]
      : never;

export function useResponseStatus() {
    const t = useTranslations('toast');

    const success = (key: Paths<IntlMessages['toast']>) => {
        enqueueSnackbar({
            message: t(key),
            variant: 'success',
        });
    };

    const error = (error: Error) => {
        console.error(error);
        const message =
            // @ts-expect-error unknown
            error?.response?.data?.message?.message ?? 'Невідома помилка';

        enqueueSnackbar({
            message,
            variant: 'error',
        });
    };

    return {
        error,
        success,
    };
}
