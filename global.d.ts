import type en from "./messages/en.json"

declare module "next" {
  interface DynamicRoute<TPath extends string> {
    pathname: TPath
    query: TPath extends `${string}[${string}]${string}`
      ? Record<string, string | string[] | undefined>
      : never
  }

  type DynamicRoutes<T extends string>
    = | T
      | { pathname: T, query: DynamicRoute<T>["query"] }

  type Pathname
    = | "/"
      | "/articles"
      | "/articles/[slug]"
      | "/tags"
      | "/tags/[tag]"
      | "/categories"
      | "/categories/[category]"
      | "/repositories"
      | "/works"
      | "/courses"
      | "/hire-me"
      | "/guestbook"
      | "/resources"
      | `/${string}/articles/${string}` // This line adds support for dynamic language routes

  interface NextRouter extends Router {
    push: (
      url: DynamicRoutes<Pathname>,
      as?: string,
      options?: TransitionOptions
    ) => Promise<boolean>
  }
}

type Messages = typeof en

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
