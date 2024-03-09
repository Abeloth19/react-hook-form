import { ErrorMessage as RHFErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';

interface ErrorMessageProps {
  name: string;
  errors: FieldErrors;
  [key: string]: any; 
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ name, errors, ...rest }) => {
  return <RHFErrorMessage name={name} errors={errors} as="p" className="mt-1 text-sm text-red-500" {...rest} />;
};

export default ErrorMessage;
