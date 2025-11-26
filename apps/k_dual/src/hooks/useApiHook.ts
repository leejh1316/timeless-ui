import {
  useQuery,
  useMutation,
  QueryKey,
  UseQueryOptions,
  UseMutationOptions,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

type AsyncFn<Args extends any[], Result> = (...args: Args) => Promise<Result>;
type ExtractFnResult<T> = T extends (...args: any[]) => Promise<infer R> ? R : never;
type ExtractFnArgs<T> = T extends (...args: infer A) => Promise<any> ? A : never;

type BaseConfig<Fn extends AsyncFn<any, any>> = Omit<
  UseQueryOptions<
    ExtractFnResult<Fn>, // TData
    Error, // TError
    ExtractFnResult<Fn>, // TDataSelect
    QueryKey // TQueryKey
  >,
  "queryKey" | "queryFn"
>;
export interface MakeQueryApiOptions<Fn extends AsyncFn<any, any>> {
  queryKey: (...args: ExtractFnArgs<Fn>) => QueryKey;
  config?: BaseConfig<Fn> | ((...args: ExtractFnArgs<Fn>) => BaseConfig<Fn>);
}

export function makeQueryApi<Fn extends AsyncFn<any, any>>(fn: Fn, options: MakeQueryApiOptions<Fn>) {
  return (...args: ExtractFnArgs<Fn>): UseQueryResult<ExtractFnResult<Fn>, Error> => {
    const resolvedConfig: BaseConfig<Fn> | undefined = typeof options.config === "function" ? options.config(...args) : options.config;

    return useQuery({
      queryKey: options.queryKey(...args),
      queryFn: () => fn(...args),
      ...resolvedConfig,
    });
  };
}

export interface MakeMutationApiOptions<Fn extends AsyncFn<any[], any>>
  extends Omit<UseMutationOptions<ExtractFnResult<Fn>, Error, ExtractFnArgs<Fn>[0]>, "mutationFn"> {}

export function makeMutationApi<Fn extends AsyncFn<any[], any>>(fn: Fn, options?: MakeMutationApiOptions<Fn>) {
  return (): UseMutationResult<ExtractFnResult<Fn>, Error, ExtractFnArgs<Fn>[0]> => {
    return useMutation({
      mutationFn: fn,
      ...options,
    });
  };
}
