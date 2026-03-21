import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface IntroSection {
  title: string;
  icon: string;
  color: string;
  expanded: boolean;
  english: string;
  dutch: string;
}

@Component({
  selector: 'app-intro-sentences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro-sentences.component.html',
  styleUrl: './intro-sentences.component.css',
})
export class IntroSentencesComponent {
  sections: IntroSection[] = [
    {
      title: 'Introduction',
      icon: '👋',
      color: 'section-blue',
      expanded: true,
      english: `Hi everyone, I'm Ariel, but you can just call me Ariel. I'm joining the development team as a Medior Full-stack Developer, working under Eric and Jan. In this role, I'll be working on applications with Angular and Java.

Most of my career has been in full-stack development with a focus on those same technologies. I've worked on a wide range of projects across various industries — including retail, pharmacy, and the gaming industry — ranging from modernizing legacy systems to building applications from the ground up.

I am originally from the Philippines, and I have spent most of my career there. I worked mostly in international companies; my previous employers were Canadian or American companies. With those came the experience of working in an international culture with people from many different backgrounds.

Before working as a software developer, I used to work in a different industry; I worked as a technician (so my path or career in software development was not linear). But years later, I realized that my passion is in software development. That realization led me to go back to school and earn a degree in Computer Engineering.

In 2022, I moved to Belgium to start a new chapter in my life and have since adjusted to living here. Personally, I am someone who loves to travel. As an immigrant who enjoys discovering new places, I really like exploring Belgium, even though there are still many spots I haven't visited yet. So far, I've been to 10 countries, but there is still so much more I want to see. Luckily, there's a lifetime to explore.

All in all, I am very happy to be here, and I am really looking forward to working with the team here at Experlogix.`,
      dutch: `Hallo iedereen, ik ben Ariel, maar noem me maar gewoon Ariel. Ik kom bij het developmentteam als Medior Full-stack Developer, werkend onder Eric en Jan. In deze rol zal ik werken aan applicaties met Angular en Java.

Het grootste deel van mijn carrière was in full-stack development met een focus op diezelfde technologieën. Ik heb aan een breed scala aan projecten gewerkt in verschillende sectoren — waaronder de retail, farmacie en de gaming-industrie — variërend van het moderniseren van legacy-systemen tot het vanaf nul opbouwen van applicaties.

Ik kom oorspronkelijk uit de Filipijnen en heb daar het grootste deel van mijn carrière doorgebracht. Ik werkte meestal bij internationale bedrijven; mijn vorige werkgevers waren Canadese of Amerikaanse bedrijven. Daarmee kwam ook de ervaring van het werken in een internationale cultuur met mensen met veel verschillende achtergronden.

Voordat ik als software developer werkte, werkte ik in een andere sector; ik werkte als technicus (dus mijn pad of carrière in softwareontwikkeling was niet lineair). Maar jaren later besefte ik dat mijn passie bij softwareontwikkeling ligt. Dat besef leidde ertoe dat ik terug naar school ging en een diploma in Computer Engineering behaalde.

In 2022 ben ik naar België verhuisd om aan een nieuw hoofdstuk in mijn leven te beginnen en sindsdien heb ik me aangepast aan het leven hier. Persoonlijk ben ik iemand die van reizen houdt. Als immigrant die ervan geniet om nieuwe plekken te ontdekken, vind ik het erg leuk om België te verkennen, ook al zijn er nog veel plekken die ik nog niet heb bezocht. Tot nu toe ben ik in 10 landen geweest, maar er is nog zoveel meer dat ik wil zien. Gelukkig is er een heel leven om te ontdekken.

Al met al ben ik erg blij om hier te zijn en ik kijk er echt naar uit om samen te werken met het team hier bij Experlogix.`,
    },
    {
      title: 'Most Memorable Trip',
      icon: '✈️',
      color: 'section-orange',
      expanded: false,
      english: `My favorite and most memorable trip was when I visited India. It was a company trip for me to attend a company conference and to receive a 'Developer of the Year' award. It was memorable not only for that reason but also because it was my first flight and, at the same time, my first trip outside the Philippines.`,
      dutch: `Mijn favoriete en meest gedenkwaardige reis was toen ik India bezocht. Het was een reis van het bedrijf om een bedrijfsconferentie bij te wonen en een 'Developer of the Year'-award in ontvangst te nemen. Het was niet alleen om die reden memorabel, maar ook omdat het mijn eerste vlucht was en tegelijkertijd mijn eerste reis buiten de Filipijnen.`,
    },
    {
      title: 'Country Dream to Visit',
      icon: '🌍',
      color: 'section-teal',
      expanded: false,
      english: `The country I would really like to visit is Iceland. I don't like winter, so it seems ironic that I want to go there since I am not a fan of the cold. However, I find it really exotic as someone who comes from a tropical country like the Philippines. I think it is the complete opposite of the Philippines, and I have heard many good things about it.

Seeing pictures of glaciers, its landscape, the Aurora Borealis, and the midnight sun — these are all things I would never experience in the Philippines. These are things I have only seen in pictures, and I would really like to see them in person.`,
      dutch: `Het land dat ik heel graag zou willen bezoeken is IJsland. Ik houd niet van de winter, dus het lijkt ironisch dat ik daarheen wil gaan aangezien ik geen fan ben van de kou. Toch vind ik het echt exotisch als iemand die uit een tropisch land als de Filipijnen komt. Ik vind het een groot contrast met de Filipijnen, en ik heb er veel goede dingen over gehoord.

Als ik de foto's zie van gletsjers, het landschap, het Noorderlicht en de middernachtzon — dat zijn allemaal dingen die ik in de Filipijnen nooit zou ervaren. Dit zijn dingen die ik alleen op foto's heb gezien en ik zou ze heel graag in het echt willen zien.`,
    },
    {
      title: 'Driving Exam',
      icon: '🚗',
      color: 'section-green',
      expanded: false,
      english: `Right now, I'm commuting by train and bus because I'm still waiting for my permanent driver's license. I actually just passed my practical exam on March 16! I only have my temporary M36 license for now, so I'll be able to drive to the office starting March 26 once I receive my actual ID card.

It was actually my third attempt! My first try was in Bree because I couldn't find a slot nearby, and I failed because I hit the brakes too hard after missing an exit. My second try in Kontich was even worse — I was so nervous and tired that I almost hit a car while turning left because I forgot to give right-of-way to oncoming cars. That was back in December. After that, I practiced like crazy and drove almost every route in Kontich. On the third try, I finally got it. As they say: third time's a charm!

It is actually really hard to find a slot. The earliest available slot at all the exam centers was in June. You have to check early every morning, like at 8:00 AM, for cancelled slots — and that's how I managed to grab one.`,
      dutch: `Op dit moment kom ik met de trein en de bus, omdat ik nog wacht op mijn definitieve rijbewijs. Ik ben toevallig net op 16 maart geslaagd voor mijn praktijkexamen! Ik heb nu nog een voorlopig rijbewijs (M36), dus vanaf 26 maart kan ik met de auto naar kantoor komen zodra ik mijn pasje heb.

Het was eigenlijk mijn derde poging! De eerste keer deed ik examen in Bree, omdat ik in de buurt nergens een plekje kon vinden. Ik zakte omdat ik te hard heb geremd toen ik een afslag miste. De tweede keer in Kontich was nog erger — ik was zo zenuwachtig en moe dat ik bijna een auto raakte bij het linksaf slaan, omdat ik vergat voorrang te verlenen aan tegenliggers. Dat was in december. Daarna heb ik echt ontzettend veel geoefend en ik heb bijna elke route in Kontich gereden. De derde keer is het eindelijk gelukt. Derde keer, goede keer.

Het is trouwens echt heel moeilijk om een afspraak te vinden. De vroegste datum bij alle examencentra was pas in juni. Je moet echt elke ochtend vroeg kijken, rond 8:00 uur, of er geannuleerde afspraken zijn vrijgekomen — en dat is hoe ik er eentje heb kunnen bemachtigen.`,
    },
    {
      title: 'Travel to Philippines',
      icon: '🏝️',
      color: 'section-yellow',
      expanded: false,
      english: `My next plan and goal is to go back to the Philippines for a visit. It's been about 3.5 years since I first moved here, so I haven't been back home for over 3 years. If I manage to go, we'll probably go in December — especially since it's winter here then! lol`,
      dutch: `Mijn volgende plan en doel is om terug naar de Filippijnen te gaan voor een bezoek. Het is alweer 3,5 jaar geleden dat ik hierheen ben gekomen, dus ik ben al meer dan 3 jaar niet in de Filippijnen geweest. Als het lukt, gaan we waarschijnlijk in december — vooral omdat het hier dan winter is! lol`,
    },
    {
      title: 'My Hobby',
      icon: '🎬',
      color: 'section-purple',
      expanded: false,
      english: `I like to travel, watch movies at the cinema, and follow sci-fi series. From time to time, I also join my husband's LGBT group for museum visits, walks, and city trips. They also host board game and movie nights. I'm an introvert, but I find it fun to join these social activities occasionally.

I recently watched the Star Trek series Starfleet Academy. I actually thought it would be bad based on the online reviews, but I quite liked it!

Just last week, I also got into Project Hail Mary. I didn't expect the storyline! I thought it would be a serious film like Armageddon, but I actually liked that it was lighthearted, funny, and — of course — sci-fi. It's about an astronaut traveling to another solar system because our sun is dying, along with other stars. The astronaut has to find out why one specific nearby system remains unaffected. Upon his arrival, he meets an alien, they become friends, and they find a way to save the sun from dying.`,
      dutch: `Ik hou van reizen, naar de film gaan en sci-fi series volgen. Af en toe ga ik mee met de LGBT-groep van mijn man voor museumbezoeken, wandelingen en stedentrips. Ik ben een introvert, maar ik vind het leuk om af en toe aan deze sociale activiteiten mee te doen.

Laatst heb ik de Star Trek-serie Starfleet Academy gezien. Ik dacht dat het slecht zou zijn door de reviews, maar ik vond het best goed!

Ook heb ik vorige week Project Hail Mary ontdekt. Ik had het verhaal totaal niet zo verwacht! Ik dacht dat het een serieuze film zoals Armageddon zou zijn, maar ik vond de humor en de sci-fi juist erg leuk. Het gaat over een astronaut die naar een ander zonnestelsel reist omdat onze zon sterft. Daar ontmoet hij een alien, worden ze vrienden en vinden ze een manier om de zon te redden.`,
    },
    {
      title: 'Last Trip',
      icon: '🗺️',
      color: 'section-red',
      expanded: false,
      english: `The last trip I took was to Delft and Den Haag. We visited Den Haag on the first day with my Filipino friends to celebrate my birthday. We went there because that is where the nearest Filipino restaurant is.

On the second day, we went to Delft. We walked around the city and had a small tour in a small vehicle. Of course, because it's the Netherlands, we saw canals! We also visited a museum about Delft Blue, which is the famous white porcelain with blue designs. It's called Delft Blue because, yeah, it was created there in the city of Delft.`,
      dutch: `Mijn laatste trip was naar Delft en Den Haag. Op de eerste dag waren we in Den Haag met mijn Filipijnse vrienden om mijn verjaardag te vieren. We gingen daarheen omdat daar het dichtstbijzijnde Filipijnse restaurant is.

De tweede dag gingen we naar Delft. We hebben door de stad gewandeld en een tour gedaan met een klein voertuig. Omdat we in Nederland waren, hebben we natuurlijk veel grachten gezien! We hebben ook een museum bezocht over Delfts Blauw, dat beroemde witte porselein met blauwe ontwerpen. Het heet Delfts Blauw omdat het daar, ja, in de stad Delft is ontstaan.`,
    },
  ];

  activeLanguage: 'english' | 'dutch' = 'english';

  toggleSection(section: IntroSection): void {
    section.expanded = !section.expanded;
  }

  toggleLanguage(): void {
    this.activeLanguage = this.activeLanguage === 'english' ? 'dutch' : 'english';
  }

  getSectionGradient(color: string): string {
    const map: Record<string, string> = {
      'section-blue': 'linear-gradient(135deg, #1e3a5f, #0f2040)',
      'section-green': 'linear-gradient(135deg, #064e1e, #032e12)',
      'section-purple': 'linear-gradient(135deg, #3b0764, #1e0336)',
      'section-orange': 'linear-gradient(135deg, #7c2d12, #4a1a08)',
      'section-teal': 'linear-gradient(135deg, #134e4a, #062e2b)',
      'section-red': 'linear-gradient(135deg, #5c0a0a, #380606)',
      'section-yellow': 'linear-gradient(135deg, #713f12, #3d2006)',
      'section-indigo': 'linear-gradient(135deg, #1e1b4b, #0f0d2b)',
    };
    return map[color] ?? '#13161e';
  }

  getAccentColor(color: string): string {
    const map: Record<string, string> = {
      'section-blue': '#60a5fa',
      'section-green': '#4ade80',
      'section-purple': '#c084fc',
      'section-orange': '#fb923c',
      'section-teal': '#2dd4bf',
      'section-red': '#f87171',
      'section-yellow': '#fbbf24',
      'section-indigo': '#818cf8',
    };
    return map[color] ?? '#94a3b8';
  }
}
