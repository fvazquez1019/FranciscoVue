<template>
    <div
        id="hero"
        class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden"
        style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
    >
        <div class="mx-6 md:mx-20 mt-0 md:mt-6">
            <h1 class="text-6xl font-bold text-gray-900 leading-tight"><span class="font-light block">See your sound</span>Visualize music in a brand new way.</h1>
            <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">Music says a lot about who we are — and now you can see it like never before. Our website turns your Spotify listening history into stunning visual insights, uncovering the rhythms, genres, and habits that shape your sound. From your favorite tracks to hidden trends you didn’t even realize, explore your music journey in a whole new way. Ready to discover your unique audio identity?</p>
            <Button label="Get Started" as="router-link" to="/auth/register" rounded class="!text-xl mt-8 !px-4"></Button>
        </div>
        <div class="flex justify-center md:justify-end">
            <img src="/demo/images/landing/ChatGPT Image Apr 20, 2025, 11_02_23 AM.png" alt="Hero Image" class="w-9/12 md:w-auto" />
        </div>
    </div>
</template>
