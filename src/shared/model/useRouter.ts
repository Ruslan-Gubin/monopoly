import { useRouter } from "next/router"


const useRouterNext = () => {
  const router = useRouter()
  const pathname = router.pathname

  const routerPushPage = (patch: string) => {
    router.push(patch)
  }

  return { routerPushPage, pathname }
}

export {useRouterNext}