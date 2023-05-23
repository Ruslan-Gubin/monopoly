import { useRouter } from "next/router"


const useRouters = () => {
  const router = useRouter()
  const pathname = router.pathname

  const routerPushPage = (patch: string) => {
    router.push(patch)
  }

  return { routerPushPage, pathname }
}

export {useRouters}