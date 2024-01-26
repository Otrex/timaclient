
import type { AxiosError } from "axios";
import { RequestState } from "~/lib/enums";
import type { ApiError, EnsureDefined, UseRequestProps, UseRequestPropsWithValidation, UseRequestReturnType } from "~/lib/interfaces/utils";


export default function <T, R = any[], M = any, K extends Record<string, any> = {}>(
  options: UseRequestPropsWithValidation<T, R, M, K>
): EnsureDefined<UseRequestReturnType<T, R, M, K>, 'validate' | 'v$' | '$fieldError'>;

export default function <T, R = any[], M = any, K extends Record<string, any> = {}>(
  options: UseRequestProps<T, R, M, K>
): Omit<UseRequestReturnType<T, R, M, K>, 'validate' | 'v$' | '$fieldError'>;


export default function <T, R = any[], M = any, K extends Record<string, any> = {}>(
  options: UseRequestProps<T, R, M, K> | UseRequestPropsWithValidation<T, R, M, K>
) {
  const { action, validation, onError, onSuccess, useGlobalLoader } = options;

  const v$ = validation && useValidator(
    validation.rule,
    validation.form,
    validation.config
  );

  async function validate() {
    if (v$) {
      const isValid = await v$.value.$validate();
      if (!isValid) throw new Error('validation error');
    }
  }

  const state = ref<RequestState>(RequestState.IDLE);
  const error = ref();

  const clear = () => state.value = RequestState.IDLE;

  const execute = async (...args: R[]) => {
    try {
      state.value = RequestState.LOADING;
      const result = await action(...args);
      state.value = RequestState.COMPLETED;
      onSuccess && onSuccess(result);
      return result;
    } catch (e) {
      state.value = RequestState.ERROR;
      error.value = e
      onError && onError(e as (AxiosError<M>['response'] | ApiError | any));
    }
  };

  const $fieldError = computed(() => {
    return Object.keys(validation!.rule || {}).reduce((acc: any, key) => {
      acc[key] = v$?.value[key].$errors[0]?.$message.toString();
      return acc;
    }, {})
  })

  return {
    $fieldError,
    validate,
    execute,
    error,
    state,
    clear,
    v$
  };
}
