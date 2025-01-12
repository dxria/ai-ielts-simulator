import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function useResponsive() {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));
    const tablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
    const desktop = useMediaQuery(theme.breakpoints.up("lg"));

    return { mobile, tablet, desktop };
}
