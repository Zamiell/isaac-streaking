<script lang="typescript">
  interface Player {
    id: number;
    name: string;
    streak: number;
    status: string;
    vod: string;
  }

  const players: Player[] = [
    /*
    {
      id: 123,
      name: "Andvil82",
      streak: "437",
      status: "Dead",
      vod: "https://www.twitch.tv/andvil82",
    },
    */
  ];
</script>

<div class="pt-8 px-4 sm:px-0 lg:px-0">
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <h1 class="text-xl font-semibold text-gray-900">Repentance - Chest</h1>
      <p class="mt-2 text-sm text-gray-700">Defeat Blue Baby.</p>
    </div>
    <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
      >
        Add your streak
      </button>
    </div>
  </div>
  <div class="mt-8 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div
          class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Streak
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  VOD
                </th>
                <!--
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
                -->
              </tr>
            </thead>
            <tbody class="bg-white">
              {#each players as player, i (player.id)}
                <tr class={i % 2 === 0 ? undefined : "bg-gray-50"}>
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {i + 1}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >{player.name}</td
                  >
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >{player.streak}</td
                  >
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >{player.status}</td
                  >
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <a href={player.vod}>{player.vod}</a>
                  </td>
                  <!--
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">
                      Edit<span class="sr-only">, {player.name}</span>
                    </a>
                  </td>
                  -->
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="sm:flex-auto">
      <p class="mt-2 text-sm text-gray-700">
        <br />
        The leaderboard is currently under development.
      </p>
    </div>
  </div>
</div>
