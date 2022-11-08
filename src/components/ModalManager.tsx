import useTheme from '../hooks/useTheme';
import AdminForm from './Authentication/AdminForm';
import SignInForm from './Authentication/SignInForm';
import SignUpForm from './Authentication/SignUpForm';
import ConfirmExitDialog from './Shared/ConfirmExitDialog';

const modals: { [key: string]: React.FunctionComponent } = {
  AdminForm,
  SignInForm,
  SignUpForm,
  ConfirmExitDialog,
};

function ModalManager() {
  const { modal } = useTheme();

  if (modal && modals[modal]) {
    const ModalComponent: React.FunctionComponent = modals[modal];
    return <ModalComponent />;
  }

  return null;
}

export default ModalManager;
