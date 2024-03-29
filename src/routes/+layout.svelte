<script lang="ts">
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
  } from "@rgossiaux/svelte-headlessui";
  import {
    MenuIcon,
    XIcon,
    LoginIcon,
  } from "@rgossiaux/svelte-heroicons/outline";
  import "../app.postcss";
  import { page } from "$app/stores";
  import { signIn, signOut } from "@auth/sveltekit/client";

  interface User {
    name: string;
    email: string;
    imageUrl: string;
  }

  let user: User | undefined = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  user = undefined;

  $: path = $page.url.pathname;
  $: navigation = [
    {
      name: "Eden",
      href: "/leaderboards/eden",
      current: path === "/leaderboards/eden",
    },
    {
      name: "Tainted Lost",
      href: "/leaderboards/lost",
      current: path === "/leaderboards/lost",
    },
    { name: "About", href: "/about", current: path === "/about" },
  ];
  const userNavigation: Array<{ name: string; href: string }> = [];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
</script>

<div class="min-h-full">
  <Disclosure as="nav" class="bg-white border-b border-gray-200" let:open>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img
              class="block lg:hidden h-8 w-auto"
              src="/soul-of-eden.png"
              alt="Logo"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="/soul-of-eden.png"
              alt="Logo"
            />
            <div class="mx-4 flex space-x-1 font-bold">Isaac Streaking</div>
          </div>

          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            {#each navigation as item (item.name)}
              <!-- The Svelte language server stops working if we put logic inside of a class ternary for some reason. -->
              <a
                href={item.current ? undefined : item.href}
                class={item.current
                  ? "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-indigo-500 text-gray-900"
                  : "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </a>
            {/each}
          </div>
        </div>

        <!-- Right side of navbar -->
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <!-- Discord -->
          <a
            href="https://discord.gg/GwhUeQjHTF"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="button"
              class="p-1 text-gray-500 hover:text-gray-700 mr-8 header-discord-link"
            />
          </a>

          <!-- GitHub -->
          <a
            href="https://github.com/Zamiell/isaac-streaking"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="button"
              class="p-1 text-gray-500 hover:text-gray-700 mr-16 header-github-link"
            />
          </a>

          <!-- Profile dropdown -->
          {#if $page.data.session}
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="sr-only">Open user menu</span>
                  {#if $page.data.session.user?.image}
                    <img
                      class="h-8 w-8 rounded-full"
                      src={$page.data.session.user.image}
                      alt=""
                    />
                  {/if}
                </MenuButton>
              </div>
              <Transition
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  {#each userNavigation as item (item.name)}
                    <MenuItem let:active>
                      <a
                        href={item.href}
                        class="block px-4 py-2 text-sm text-gray-700"
                        class:bg-gray-100={active}
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  {/each}
                  <MenuItem let:active>
                    <button
                      class="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      class:bg-gray-100={active}
                      on:click={() => signOut()}
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          {:else}
            <button on:click={() => signIn("discord")} class="flex">
              <LoginIcon class="-ml-1 mr-2 h-6 w-6" aria-hidden="true" />
              Sign in
            </button>
          {/if}
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="sr-only">Open main menu</span>
            {#if open}
              <XIcon class="block h-6 w-6" aria-hidden="true" />
            {:else}
              <MenuIcon class="block h-6 w-6" aria-hidden="true" />
            {/if}
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        {#each navigation as item (item.name)}
          <a href={item.href}>
            <DisclosureButton
              as="a"
              class={classNames(
                item.current
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </DisclosureButton>
          </a>
        {/each}
      </div>

      <div class="pt-4 pb-3 border-t border-gray-200">
        {#if $page.data.session}
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              {#if $page.data.session.user?.image}
                <img
                  class="h-10 w-10 rounded-full"
                  src={$page.data.session.user?.image}
                  alt=""
                />
              {/if}
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">
                {$page.data.session.user?.name}
              </div>
              <div class="text-sm font-medium text-gray-500">
                {$page.data.session.user?.email}
              </div>
            </div>
          </div>
          <div class="mt-3 space-y-1">
            {#each userNavigation as item (item.name)}
              <a href={item.href}>
                <DisclosureButton
                  class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  {item.name}
                </DisclosureButton>
              </a>
            {/each}
          </div>
        {:else}
          <div class="flex items-center px-4">
            <button on:click={() => signIn("discord")}>Sign In</button>
          </div>
        {/if}
      </div>
    </DisclosurePanel>
  </Disclosure>

  <div class="py-10">
    <slot />
  </div>
</div>

<style>
  .header-discord-link {
    display: flex;
    min-height: 28px;
  }

  .header-discord-link:hover {
    opacity: 0.6;
  }

  .header-discord-link:before {
    content: "";
    width: 28px;
    height: 28px;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='black' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z'/%3E%3C/svg%3E")
      no-repeat;
  }

  /*
  html[data-theme="dark"] .header-discord-link:before {
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z'/%3E%3C/svg%3E")
      no-repeat;
  }
  */

  .header-discord-link:after {
    content: "Discord";
    padding-left: 0.5em;

    /* The Discord icon makes the text misaligned by 2 pixels for some reason. */
    position: relative;
    top: 2px;
  }

  .header-github-link {
    display: flex;
    min-height: 28px;
  }

  .header-github-link:hover {
    opacity: 0.6;
  }

  .header-github-link:before {
    content: "";
    width: 24px;
    height: 24px;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E")
      no-repeat;
  }

  /*
  html[data-theme="dark"] .header-github-link:before {
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E")
      no-repeat;
  }
  */

  .header-github-link:after {
    content: "GitHub";
    padding-left: 0.5em;
  }
</style>
