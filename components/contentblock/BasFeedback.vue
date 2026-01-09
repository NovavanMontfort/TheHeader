<!-- In de file HomepageHeaderContentBlock.vue, is het volgende gedaan -->

<!-- Tekst toegevoegd -->
<!-- Context: de tekst “Wij hebben hart voor cultuur!” staat nu in de <template> in een <div> met v-if="showHeart". 
Dit zorgt ervoor dat de tekst pas zichtbaar wordt als de kinetic animatie klaar is (dus wanneer showHeart true is).-->

<template>
    <div class="center-container" v-if="showHeart">
        <p class="custom-text">Wij hebben <br>hart voor cultuur!</p>
    </div>
</template>

<!-- Styling toegevoegd -->
<!-- Context: de styling zorgt dat de tekst netjes in het midden staat en dat de grootte meeschuift met het scherm, dankzij clamp().-->

<style lang="scss" scoped>
.center-container {
    position: relative;
    z-index: 10;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    pointer-events: none;
    color: white;
}

.custom-text {
    font-size: clamp(3rem, 5vw, 10rem);
    font-weight: 900;
    line-height: 1;
    margin: 0;
}
</style>

<!-- In de file "KineticText.vue", de volgende code aangepast met: -->

<template>
    <div ref="kineticType" id="kinetic-type">
        <div v-for="n in 20" :key="n" :class="n % 2 === 1 ? 'type-line odd' : 'type-line even'">
            THE CULTURE LAB THE CULTURE LAB THE CULTURE LAB <!-- de aanpassing -->
        </div>
    </div>
</template>


<!-- In de file "BackgroundText.vue", de volgende code aangepast met: -->

<script setup>
const textItems = reactive([
    { id: 1, text: "THEATERS", top: "12%", left: "12%", right: null, highlighted: false },
    { id: 2, text: "SCHOUWBURGEN", top: "12%", left: "45%", right: null, highlighted: false },
    { id: 3, text: "BIOSCOPEN", top: "12%", left: null, right: "20%", highlighted: false },
    { id: 4, text: "FILMHUIZEN", top: "18%", left: "8%", right: null, highlighted: false },
    { id: 5, text: "KUNST", top: "18%", left: "30%", right: null, highlighted: false },
    { id: 6, text: "CULTUURCENTRA", top: "18%", left: "55%", right: null, highlighted: false },
    { id: 7, text: "CURSUSCENTRA", top: "18%", left: null, right: "5%", highlighted: false },
    { id: 8, text: "CULTUUREDUCATIE", top: "25%", left: null, right: "5%", highlighted: false },
    { id: 9, text: "MUSEA", top: "35%", left: "25%", right: null, highlighted: false },
    { id: 10, text: "EXPOSITIES", top: "35%", left: "65%", right: null, highlighted: false },
    { id: 11, text: "POPPODIA", top: "50%", left: "5%", right: null, highlighted: false },
    { id: 12, text: "CONCERTGEBOUWEN", top: "50%", left: null, right: "5%", highlighted: false },
    { id: 13, text: "FESTIVALS", top: "75%", left: "20%", right: null, highlighted: false },
    { id: 14, text: "PODIUMKUNSTEN", top: "75%", left: null, right: "20%", highlighted: false },
    { id: 15, text: "GEZELSCHAPPEN", top: "80%", left: "10%", right: null, highlighted: false },
    { id: 16, text: "PRODUCTIEHUIZEN", top: "80%", left: "35%", right: null, highlighted: false },
    { id: 17, text: "MAKERS", top: "80%", left: "65%", right: null, highlighted: false },
    { id: 18, text: "NETWERKEN", top: "80%", left: null, right: "10%", highlighted: false },
    { id: 19, text: "BIBLIOTHEKEN", top: "85%", left: "25%", right: null, highlighted: false },
]);
</script>
