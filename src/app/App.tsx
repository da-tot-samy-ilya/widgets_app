import { WidgetsPanel } from "../features/widgetsPanel";
import { WidgetsModal } from "../shared/ui/Modal";
import { useAppSelector } from "./hooks.ts";
import { selectIsOpenModal } from "../shared/ui/Modal/model/selectors.ts";

function App() {
  const isOpen = useAppSelector(selectIsOpenModal);

  return (
    <>
      <WidgetsPanel />

      {isOpen ? <WidgetsModal /> : null}
    </>
  );
}

export default App;
