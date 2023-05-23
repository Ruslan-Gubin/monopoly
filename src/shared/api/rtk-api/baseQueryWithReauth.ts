import { type FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import {
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import {
  type BaseQueryApi,
  type QueryReturnValue,
} from '@reduxjs/toolkit/src/query/baseQueryTypes'
import { baseQuery } from './baseQuery'
import { invalidateAccessToken } from './invalidateTokenEvent'

const AUTH_ERROR_CODES = new Set([401])

export async function baseQueryWithReauth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
  const result = await baseQuery(args, api, extraOptions)
  

 /**
* 👇 ВНИМАНИЕ: Мы не можем использовать какой-либо звук в прямом режиме,
* потому что это нарушение FSD:
*
* api.dispatch(logoutThunk()) // 👎
*
* * Итак, мы отправляем общее событие `invalidateAccessToken`,
* который подписывается через промежуточное программное обеспечение redux на других уровнях.
* Смотрите пример в @/features/authentication/InvalidateAccessToken
*/
  if (
    typeof result.error?.status === 'number' &&
    result.error &&
    AUTH_ERROR_CODES.has(result.error.status)
  ) {
    api.dispatch(invalidateAccessToken())
  }

  return result
}