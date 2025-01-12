import IntlProvider from "@/providers/intl-provider";
import UiProvider, { type UiProviderProps } from "@/providers/ui-provider";

export default function Providers({
    children,
    viewport,
}: React.PropsWithChildren<UiProviderProps>) {
    return (
        <IntlProvider>
            <UiProvider viewport={viewport}>{children}</UiProvider>
        </IntlProvider>
    );
}
