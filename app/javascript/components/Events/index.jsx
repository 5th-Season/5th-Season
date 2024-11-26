import React from "react";

const Events = () => {
  return (
    <div class="container mx-auto p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Coming soon</h1>
          <p className="text-gray-600">Be among the first to know when new products launch</p>
        </div>
        <a
          href="/launch/create"
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 text-sm font-semibold"
        >
          Create Launch
        </a>
      </div>

    <div class="flex flex-col lg:flex-row lg:space-x-16">
        <div class="flex-1">
            <h2 class="text-sm font-semibold text-gray-600 mb-4">NEXT 7 DAYS</h2>

            <div class="space-y-6">
                <div class="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg">
                    <div class="flex items-center">
                        <img src="https://images.pexels.com/photos/965324/pexels-photo-965324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="ralify" class="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <h3 class="font-bold">Aliétte Drop Shop</h3>
                            <p class="text-sm text-gray-500">188 Attending</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Share</button>
                        <button class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">Notify me</button>
                    </div>
                </div>

                <div class="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg">
                    <div class="flex items-center">
                        <img src="https://images.pexels.com/photos/1154861/pexels-photo-1154861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Comtrax" class="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <h3 class="font-bold">Pyer Moss Runway</h3>
                            <p class="text-sm text-gray-500">26 Attending</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Share</button>
                        <button class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">Notify me</button>
                    </div>
                </div>

                <div class="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg">
                    <div class="flex items-center">
                        <img src="https://images.pexels.com/photos/994234/pexels-photo-994234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="ToonTalk" class="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <h3 class="font-bold">Aurora James Runs the Show!</h3>
                            <p class="text-sm text-gray-500">16 Attending</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Share</button>
                        <button class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">Notify me</button>
                    </div>
                </div>

                <div class="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg">
                    <div class="flex items-center">
                        <img src="https://images.pexels.com/photos/1144834/pexels-photo-1144834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Eaziquote" class="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <h3 class="font-bold">Telfar Elegant Suare</h3>
                            <p class="text-sm text-gray-500">6 Attending</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Share</button>
                        <button class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">Notify me</button>
                    </div>
                </div>

                <div class="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg">
                    <div class="flex items-center">
                        <img src="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="HappyLab" class="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <h3 class="font-bold">HappyLab Design Showcase</h3>
                            <p class="text-sm text-gray-500">+16 • Productivity, Newsletters</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Share</button>
                        <button class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">Notify me</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full lg:w-1/3 mt-10 lg:mt-0">
            <div class="p-6 bg-gray-100 rounded-lg shadow-sm">
                <h3 class="text-sm font-semibold text-gray-600 mb-4">ABOUT THIS PAGE</h3>
                <p class="text-sm text-gray-700 mb-4">
                    This page shows designer launches, events and drops that are coming soon. Click 'Notify me' to be the first to find out when events go live.
                </p>
                <p class="text-sm text-gray-700 mb-4">
                    If you would like your launch to be listed here, schedule it in advance, and create a teaser - it's free!
                </p>
                <a href="#" class="text-blue-600 font-semibold">Learn more</a>
            </div>
        </div>
    </div>
</div>
  )
}

export default Events;