import React from 'react'

export default function SidebarSkeleton() {
  return (
    <aside className="fixed inset-y-0 start-0 z-[60] hidden w-[260px] space-y-6 border-e border-neutral-300 bg-content1 py-4 transition-all duration-300 dark:border-neutral-700 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0 animate-pulse">
      <div className="px-3">
        <div className="flex pb-1 flex-col relative overflow-hidden h-auto box-border outline-none shadow-medium rounded-large transition-transform-background motion-reduce:transition-none bg-white text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300">
          <div className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left subpixel-antialiased overflow-visible p-0">
            <div className="h-24 bg-neutral-300 dark:bg-neutral-600 flex justify-center items-center">
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="-mt-1 flex w-full items-center justify-center">
              <div className="relative flex w-full justify-center">
                <span className="justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-8 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-8 h-8 text-tiny bg-default text-default-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-default absolute -top-4 flex size-14">
                  <div className="flex object-cover w-full h-full transition-opacity opacity-0 data-[loaded=true]:opacity-80 bg-neutral-300"></div>
                </span>
              </div>
            </div>
          </div>
          <div className="p-3 h-auto flex w-full space-y-3.5 flex-col rounded-b-large">
            <div className="mt-[2.315rem] flex items-center justify-center">
              <div className="h-2.5 bg-neutral-300 rounded-full dark:bg-neutral-600 w-14"></div>
              <div className="h-2.5 ms-2 bg-neutral-300 rounded-full dark:bg-neutral-600 w-20"></div>
              <div className="h-2.5 ms-2 bg-neutral-300 rounded-full dark:bg-neutral-600 w-20"></div>
            </div>
            <div className="my-0.5 flex items-center justify-center">
              <div className="h-2.5 bg-neutral-300 rounded-full dark:bg-neutral-600 w-12"></div>
              <div className="h-2.5 ms-2 bg-neutral-300 rounded-full dark:bg-neutral-600 w-12"></div>
              <div className="h-2.5 ms-2 bg-neutral-300 rounded-full dark:bg-neutral-600 w-4"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-2.5 bg-neutral-300 rounded-full dark:bg-neutral-600 w-14"></div>
              <div className="h-2.5 ms-2 bg-neutral-300 rounded-full dark:bg-neutral-600 w-14"></div>
              <div className="h-2.5 ms-2 bg-neutral-300 rounded-full dark:bg-neutral-600 w-4"></div>
            </div>
            <div className="mt-0.5 flex items-center justify-center">
              <div className="h-2.5 ms-2 bg-neutral-300 rounded-full dark:bg-neutral-600 w-4"></div>
              <div className="h-2.5 ms-2 bg-neutral-300 rounded-full dark:bg-neutral-600 w-16"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-96 space-y-6 overflow-y-auto px-3 pb-4">
        <div className="space-y-2">
          <div className="h-8 w-full rounded bg-neutral-300" />
          <div className="my-2 h-8 w-full rounded bg-neutral-300 dark:bg-neutral-600" />
          <div className="my-2 h-8 w-full rounded bg-neutral-300 dark:bg-neutral-600" />
          <div className="my-2 h-8 w-full rounded bg-neutral-300 dark:bg-neutral-600" />
          <div className="h-8 w-full rounded bg-neutral-300 dark:bg-neutral-600" />
        </div>
        <div className="flex flex-col relative overflow-hidden h-auto bg-neutral-300 dark:bg-neutral-600 rounded-md">
          <div className="flex p-3 items-center justify-start gap-2">
            <div className="h-3 bg-neutral-100 rounded-full dark:bg-neutral-400 w-16"></div>
            <div className="h-3 bg-neutral-100 rounded-full dark:bg-neutral-400 w-3"></div>
            <div className="h-3 bg-neutral-100 rounded-full dark:bg-neutral-400 w-16"></div>
          </div>
          <div className="relative flex flex-col w-full space-y-3 p-3 h-16 mt-4">
            <div className="flex items-center justify-start gap-1.5">
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-3"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-6"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-[2.3rem]"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-[2.3rem]"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-6"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-3"></div>
            </div>
            <div className="flex items-center justify-start gap-1.5">
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-5"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-[6.5rem]"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-3"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-5"></div>
            </div>
            <div className="flex items-center justify-start gap-1.5">
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-[6.5rem]"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-[6.5rem]"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-3"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-12"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-3"></div>
            </div>
            <div className="flex items-center justify-start gap-1.5">
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-16"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-16"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-3"></div>
              <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-neutral-400 w-5"></div>
            </div>
          </div>
          <div className="p-3 h-10 w-full flex flex-row gap-2">
            <div className="h-10 w-full bg-neutral-300 dark:bg-neutral-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </aside>
  )
}
