export type CategoryTone = 'terracotta' | 'pink' | 'gold' | 'sea' | 'sky' | 'green'

export type HeritageItem = {
  slug: string
  name: string
  summary: string
  description: string
  where: string
  image: string
}

export type Category = {
  slug: string
  key: string
  image: string
  tone: CategoryTone
  items: HeritageItem[]
}

const toSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

type RawItem = Omit<HeritageItem, 'slug'>

const withSlugs = (items: RawItem[]): HeritageItem[] =>
  items.map((item) => ({ ...item, slug: toSlug(item.name) }))

export const categories: Category[] = [
  {
    slug: 'art',
    key: 'art',
    image: '/images/cat-art.png',
    tone: 'terracotta',
    items: withSlugs([
      {
        name: 'Coconut Shell Craft',
        summary: 'Polished coconut shells turned into bowls, lamps and souvenirs.',
        description:
          'Coconut shell craft is a traditional Goan handicraft that transforms the hard outer shells of coconuts, abundant across a state ringed by palm groves, into bowls, ladles, lamps, buttons, jewellery and decorative figurines. Artisans first clean and dry the shells, then scrape away the fibrous husk before cutting, sanding and polishing the surface until it develops a smooth, dark sheen. Some pieces are carved with floral or geometric motifs, while others are inlaid with beads or seashells for extra ornamentation. The craft reflects Goa\u2019s deep-rooted culture of resourcefulness, where the coconut palm, central to local life and cuisine, leaves nothing to waste. Once purely functional, with shells serving as household ladles and oil lamps, the craft today also supplies tourist markets with souvenirs and jewellery. It is practised in small home workshops and cooperatives in coastal villages, where skills pass down within families, keeping alive a simple, sustainable art form tied to Goa\u2019s palm-fringed landscape.',
        where: 'Village workshops and craft markets across coastal Goa',
        image: '/images/items/coconut-shell-craft.png',
      },
      {
        name: 'Bamboo Craft',
        summary: 'Woven baskets, mats and fish traps made by skilled Mahar and Kunbi artisans.',
        description:
          'Bamboo craft is one of Goa\u2019s oldest rural handicrafts, practised chiefly by the Mahar and Kunbi communities who have long worked with the cane that grows abundantly in the state\u2019s forested talukas. Skilled artisans split and shave bamboo poles into thin strips, then weave them into winnowing trays, storage baskets, mats, fish traps and simple furniture. The craft demands patience and dexterity, as each strip must be woven tightly enough to bear weight yet remain flexible. These objects are not merely decorative; they serve real purposes in Goan households, fields and fishing communities, from carrying the day\u2019s catch to storing grain after harvest. Passed down through generations without formal training, the weaving techniques reflect an intimate knowledge of local materials and rural needs. Villages in Sattari, Sanguem and Canacona remain centres of this craft, where bamboo continues to be shaped into everyday tools that connect contemporary Goan life to its agrarian and fishing traditions.',
        where: 'Rural talukas such as Sattari, Sanguem and Canacona',
        image: '/images/items/bamboo-craft.png',
      },
      {
        name: 'Wood Carving',
        summary: 'Ornate carved altars, furniture and doors shaped by generations of carpenters.',
        description:
          'Wood carving in Goa is a craft tradition that fuses Indian iconography with the ornamental styles brought by Portuguese colonial rule. Skilled carpenters have long shaped rosewood, teak and other hardwoods into elaborate gilded altars for Goa\u2019s baroque churches, intricately carved temple chariots and doors, and richly detailed furniture for ancestral homes. The work involves chiselling deep relief patterns, such as scrolling vines, cherubs and floral rosettes, before the surface is smoothed and, in church settings, often gilded with gold leaf. This carving tradition required generations of apprenticeship, with knowledge passed from master carpenter to student within family workshops. It remains visible today in the interiors of landmark churches such as the Basilica of Bom Jesus, in Hindu temple woodwork, and in heritage houses across Goa that still display carved four-poster beds, cupboards and doorways. The craft stands as a lasting record of the meeting of European and Indian artistic sensibilities in Goa.',
        where: 'Church interiors, temples and heritage houses statewide',
        image: '/images/items/wood-carving.png',
      },
      {
        name: 'Wooden Lacquerware',
        summary: 'Brightly lacquered toys, boxes and cradles turned on a lathe.',
        description:
          'Wooden lacquerware, known for its bright, glossy finish, is produced by turning blocks of soft wood on a hand-operated lathe and coating the surface with coloured lac, a resin secreted by lac insects. As the wood spins, the artisan presses sticks of coloured lac against it; friction melts the resin onto the surface, which is then polished smooth using dried palm leaves until it gleams. This technique produces vividly coloured toys, spinning tops, kitchen utensil sets, decorative boxes and ceremonial cradles used at children\u2019s naming or birth celebrations. The craft is closely associated with workshops around Cuncolim, where lacquer turning has been practised for generations as a livelihood passed within artisan families. Unlike painted decoration, the colour in lacquerware is fused into the surface itself, giving the objects a durable shine that withstands years of handling. Lacquerware pieces remain popular as children\u2019s toys, festive gifts and household items across Goa, valued for their craftsmanship and cheerful colour.',
        where: 'Traditional lacquer workshops, notably around Cuncolim',
        image: '/images/items/wooden-lacquerware.png',
      },
      {
        name: 'Terracotta Craft',
        summary: 'Earthen pots, votive figures and roof tiles fired from Goan clay.',
        description:
          'Terracotta craft in Goa involves shaping and firing local clay into everyday and ritual objects, a skill maintained by traditional potter communities in villages such as Bicholim and Mollem. Using a potter\u2019s wheel, artisans throw cooking pots, water vessels and storage jars, while by hand they mould votive figures, small clay horses, deities and animals, that devotees offer at village shrines and roadside deities as tokens of a wish or vow. The clay is dug locally, kneaded to remove air pockets, shaped, dried slowly in the shade, and finally fired in open kilns or pits, which gives the pieces their characteristic reddish-brown colour. Beyond pots and votive figures, the same clay tradition produces the roof tiles seen on countless Goan homes, a material choice suited to the region\u2019s heavy monsoon rains. Terracotta craft reflects the enduring link between Goa\u2019s rural potter communities, its religious customs, and the practical demands of local architecture and household life.',
        where: 'Potter villages such as Bicholim and Mollem',
        image: '/images/items/terracotta-craft.png',
      },
      {
        name: 'Brass Metalware',
        summary: 'Temple lamps, vessels and bells cast in gleaming brass.',
        description:
          'Brass metalware is central to religious and domestic life in Goa, produced by metalworking families concentrated around temple towns such as Ponda and Bicholim. Craftsmen cast and hand-beat brass into samai, the traditional oil lamps lit during prayer, along with bells, water vessels, trays and other ritual items used in temple worship and household shrines. The process typically begins with melting brass and pouring it into moulds, or hammering sheet metal into shape, followed by careful finishing to achieve smooth, gleaming surfaces and, in some pieces, engraved decorative patterns. Brass objects hold both practical and symbolic value: lamps are lit daily in temples and homes, bells accompany aartis, and vessels are used in festival rituals and life-cycle ceremonies. The craft has been sustained by demand from Goa\u2019s many temples and the state\u2019s strong tradition of Hindu ritual practice, making brass metalware an essential, living part of everyday devotional life rather than a purely decorative art.',
        where: 'Temple towns and metalworking families of Ponda and Bicholim',
        image: '/images/items/brass-metalware.png',
      },
      {
        name: 'Seashell Craft',
        summary: 'Shells and cowries crafted into jewellery, frames and lamps.',
        description:
          'Seashell craft draws directly on Goa\u2019s long Arabian Sea coastline, where cowries, conches and other shells washed ashore are collected, cleaned and transformed into jewellery, picture frames, mirrors, lamps and decorative ornaments. Artisans sort shells by size, shape and colour, then glue, string or set them into designs, sometimes combining them with beads or wood for contrast. Beach markets and coastal villages across North and South Goa are the main centres of this craft, where sellers display shell curtains, necklaces and wind chimes alongside more elaborate lamp bases and wall hangings. The craft grew naturally from Goa\u2019s fishing and coastal communities, for whom shells were a freely available material long before they became souvenirs for visitors. Today, seashell craft is closely tied to Goa\u2019s tourism economy, sold at beachside stalls and markets, but it continues to express a genuinely local relationship between the state\u2019s people and the sea that shapes so much of their livelihood and identity.',
        where: 'Beach markets and coastal villages of North and South Goa',
        image: '/images/items/seashell-craft.png',
      },
      {
        name: 'Crochet and Embroidery',
        summary: 'Delicate lacework and needlework passed down through Goan households.',
        description:
          'Crochet and embroidery became deeply rooted household arts in Goa during the Portuguese colonial era, when convent schools and missionary education introduced European needlework techniques to Goan women. Over generations, these skills were adapted and passed down within families, producing delicate lace doilies, trimmed table linen, altar cloths for churches, and elaborately embroidered trousseau pieces prepared for weddings. The craft requires fine motor skill and patience: crochet uses a single hook to loop thread into intricate lace patterns, while embroidery involves stitching decorative designs directly onto fabric with needle and thread. These items carry sentimental and ceremonial value, often stitched by mothers and grandmothers for a daughter\u2019s wedding trousseau or a church\u2019s feast-day decoration. Though less commercially prominent than other crafts, crochet and embroidery persist in many Goan Catholic homes and through craft cooperatives that help artisans sell their work, preserving a quiet but enduring domestic art tradition.',
        where: 'Homes, convents and craft cooperatives across Goa',
        image: '/images/items/crochet-and-embroidery.png',
      },
    ]),
  },
  {
    slug: 'painting',
    key: 'painting',
    image: '/images/cat-painting.png',
    tone: 'pink',
    items: withSlugs([
      {
        name: 'Goan Mural Painting',
        summary: 'Large wall paintings that decorate churches, homes and public spaces.',
        description:
          'Goan mural painting spans centuries, from the painted ceilings and wall panels of historic churches to vibrant contemporary artworks found in towns like Panjim. Traditional church murals often depicted biblical scenes, saints and decorative motifs, executed directly onto plaster using techniques brought by European-trained artists and later adapted by local painters. In more recent decades, mural painting has expanded beyond religious buildings into public art, with artists using building facades in heritage quarters to portray village life, folk festivals, boats and the coastal landscape in bold, saturated colour. The murals serve different purposes depending on their setting: inside churches they support devotion and storytelling, while public murals celebrate community identity and beautify urban and rural spaces alike. Old Goa\u2019s churches and Panjim\u2019s heritage neighbourhoods remain key places to see this range, where centuries-old religious murals sit within the same historic landscape as newer, community-driven wall art, reflecting the continuity and evolution of Goan visual culture.',
        where: 'Old Goa churches, Panjim and heritage homes',
        image: '/images/items/goan-mural-painting.png',
      },
      {
        name: 'Azulejo Tile Art',
        summary: 'Hand-painted blue and white ceramic tiles of Portuguese origin.',
        description:
          'Azulejo tile art refers to glazed ceramic tiles, traditionally hand-painted in cobalt blue on a white background, a decorative style introduced to Goa through Portuguese colonial influence. In Goa, azulejos found a distinctly local use: painted house nameplates bearing a family\u2019s name and sometimes a patron saint, alongside decorative panels on church walls and painted street name signs in older neighbourhoods. Creating an azulejo involves glazing a ceramic tile, then hand-painting the design with mineral-based blue pigment before firing it at high temperature to fix the colour permanently into the glaze. The style is most visible in Fontainhas, Panjim\u2019s Latin Quarter, where colourful houses display painted tile nameplates as a point of pride and identity. Contemporary local artists continue to hand-paint azulejos, keeping the tradition alive both as heritage conservation and as a decorative craft sold to residents and visitors who want a tangible piece of Goa\u2019s Indo-Portuguese aesthetic.',
        where: 'Fontainhas in Panjim and heritage buildings statewide',
        image: '/images/items/azulejo-tile-art.png',
      },
      {
        name: 'Christian Religious Art',
        summary: 'Altarpieces, saints and biblical scenes painted for Goan churches.',
        description:
          'Christian religious art in Goa developed over centuries of devotion following the arrival of Portuguese colonial rule and Catholic missionary activity in the sixteenth century. It encompasses altarpieces, painted panels depicting the lives of saints, ceiling paintings and devotional images created for the many churches built across the territory. Much of this art blends European painting traditions and iconography with the sensibilities of local artists and craftsmen, who were often trained by or worked alongside European missionaries and painters. Subjects range from scenes of the Passion and depictions of Christ and the Virgin Mary to portraits of missionary saints associated with Goa, most notably St. Francis Xavier. This body of work is preserved and displayed in major landmarks such as the Se Cathedral, the Church of St. Francis of Assisi, and the museums of Old Goa, where visitors can trace both the religious history of the region and the artistic exchange between European and Goan traditions.',
        where: 'Se Cathedral, Church of St. Francis of Assisi and museums of Old Goa',
        image: '/images/items/christian-religious-art.png',
      },
      {
        name: 'Chitari Decorative Art',
        summary: 'Painted wooden toys and ritual objects by the Chitari artisan community.',
        description:
          'Chitari decorative art is produced by the Chitari community, traditional painters known for decorating wooden objects with bright colours and intricate floral patterns. Their work covers a wide range of items, including toys, ritual boxes used in religious ceremonies, festival decorations and other ceremonial pieces, each hand-painted with detailed motifs that often draw on nature, such as flowers, leaves and simple figurative designs. The Chitaris are historically associated with artisan communities influenced by the painting traditions of Sawantwadi, just across Goa\u2019s border in Maharashtra, and their skills have been carried into Goan markets and border villages over generations. The painting process typically involves applying a base coat to the wooden object, then layering fine brushwork in contrasting colours to build up the pattern before a protective varnish is added. Chitari work remains valued for its bright, folk-art character, distinguishing it from more formal religious or European-influenced painting styles found elsewhere in Goa, and it continues to be sold in artisan markets.',
        where: 'Artisan families in Sawantwadi-influenced border villages and Goan markets',
        image: '/images/items/chitari-decorative-art.png',
      },
      {
        name: 'Traditional Temple Murals',
        summary: 'Painted walls and ceilings depicting deities and epic tales.',
        description:
          'Traditional temple murals decorate the walls and ceilings of Goa\u2019s Hindu temples, particularly those concentrated in and around Ponda, often called the state\u2019s Hindu heartland. These paintings depict scenes and figures drawn from the Ramayana, the Mahabharata and the Puranas, bringing episodes from these epics and stories of various deities into the visual environment of worship. Local painters, sometimes trained within family lineages of temple artists, are commissioned to renew or repaint these murals periodically, both to preserve the artwork against wear and to refresh the temple\u2019s appearance for festivals and ceremonies. The murals typically use bright colours and stylised figures recognisable within broader Indian temple painting traditions, adapted to the scale and architecture of Goan temple structures. Beyond decoration, the murals serve an educational and devotional purpose, visually narrating religious stories for worshippers and reinforcing the temple as a space where sacred history is both told and seen, generation after generation.',
        where: 'Temples of Ponda and the Hindu heartland of Goa',
        image: '/images/items/traditional-temple-murals.png',
      },
      {
        name: 'Folk Wall Painting',
        summary: 'Village wall art made for festivals, weddings and rituals.',
        description:
          'Folk wall painting is a home-based tradition in Goa\u2019s rural interior, where villagers paint auspicious symbols, floral patterns and simple figures directly onto the walls of their houses ahead of festivals, weddings and other ceremonies. Using natural pigments and, in many cases, whitewash as a base, families create designs intended to mark the occasion as special and to invite good fortune into the home. The patterns vary by region and occasion but often include motifs tied to fertility, prosperity and protection, echoing broader Indian folk-painting traditions found across rural households. Unlike commissioned or professional artwork, folk wall painting is typically done by family members themselves, making it an expression of communal participation rather than specialised craft. The practice reflects how art in rural Goa is woven into the rhythm of everyday and ceremonial life rather than confined to galleries or churches, turning ordinary domestic walls into temporary canvases for celebration, hospitality and cultural continuity within the hinterland villages.',
        where: 'Rural homes across the Goan hinterland',
        image: '/images/items/folk-wall-painting.png',
      },
    ]),
  },
  {
    slug: 'dance',
    key: 'dance',
    image: '/images/cat-dance.png',
    tone: 'gold',
    items: withSlugs([
      {
        name: 'Fugdi',
        summary: 'A lively circular dance performed by women during festivals.',
        description:
          'Fugdi is a lively folk dance performed almost exclusively by women, most closely associated with the Hindu festival of Ganesh Chaturthi and the Konkani month of Bhadrapad. Dancers form circles or rows, singing traditional songs while clapping in rhythm; as the song builds, the tempo accelerates and the women spin with increasing speed and energy, often continuing until they are breathless. There is no instrumental accompaniment in its purest form: the dance relies on the dancers\u2019 own voices and clapping to keep time, giving it a distinctly communal, participatory character. Fugdi is performed in homes and village gatherings during festival celebrations, frequently as part of the rituals welcoming and later bidding farewell to the Ganesha idol. Beyond its entertainment value, the dance is understood as an expression of devotion and joy, allowing women of different ages to take part together. It remains one of the most recognisable and widely performed folk dances in Goa\u2019s festive calendar today.',
        where: 'Villages throughout Goa, especially during Ganesh Chaturthi',
        image: '/images/items/fugdi.png',
      },
      {
        name: 'Dekhnni',
        summary: 'A graceful dance-song blending Indian and Western musical elements.',
        description:
          'Dekhnni is a graceful dance-song form that tells the story of a young devadasi, or temple dancer, pleading with a boatman to ferry her across a river. The performance blends movements drawn from Indian classical and folk dance traditions with melodies that carry a distinctly Western musical influence, a fusion that reflects Goa\u2019s layered cultural history. It is often accompanied by the ghumot, Goa\u2019s heritage earthen drum, alongside other instruments, creating a soundscape that bridges Indian rhythm and colonial-era musical sensibility. The dancer\u2019s gestures are typically expressive and narrative, using hand movements and facial expression to convey the emotion of the song\u2019s story rather than pure technical virtuosity. Dekhnni is performed on cultural stages and at village celebrations across Goa, and is often included in showcases of Goan heritage arts precisely because it exemplifies the blending of traditions that defines much of the state\u2019s folk performance repertoire, distinguishing it from purely classical or purely Western dance forms.',
        where: 'Cultural stages and village celebrations across Goa',
        image: '/images/items/dekhnni.png',
      },
      {
        name: 'Kunbi Dance',
        summary: 'A dance of the Kunbi community, among Goa\u2019s earliest settlers.',
        description:
          'The Kunbi dance belongs to the Kunbi community, widely regarded as among the earliest settler and agrarian communities of Goa. Performed by women dressed in the community\u2019s distinctive red-checked sari, tied in a practical style suited to fieldwork, the dance features simple, rhythmic steps accompanied by traditional songs that speak to agricultural life, community bonds and seasonal celebration. The movements are unhurried and grounded compared to some of Goa\u2019s more vigorous festival dances, reflecting the dance\u2019s roots in everyday rural experience rather than theatrical spectacle. It is typically performed during community celebrations and cultural events in Kunbi villages, particularly in the Salcete region and other parts of South Goa where the community has a strong presence. The Kunbi dance is valued today not only as entertainment but as a marker of cultural identity, offering a visible link to the agricultural traditions and communal life of one of Goa\u2019s oldest social groups amid the state\u2019s rapid modernisation.',
        where: 'Kunbi villages of Salcete and South Goa',
        image: '/images/items/kunbi-dance.png',
      },
      {
        name: 'Ghode Modni',
        summary: 'A warrior dance with dancers riding decorated dummy horses.',
        description:
          'Ghode Modni is a vigorous warrior dance that commemorates the victories of Maratha soldiers, performed most prominently during the spring festival of Shigmo. Dancers wear colourful dummy horses strapped around their waists, giving the impression of mounted warriors, and carry swords or sticks as they move through choreographed sequences that mimic battle and cavalry charges. The dance is performed to the powerful, driving beat of drums such as the dhol, which sets an intense rhythm matching the dancers\u2019 quick footwork and dramatic gestures. Ghode Modni is closely tied to the historical memory of Maratha military campaigns in the Konkan region, and its performance during Shigmo processions turns village streets into stages for retelling that martial history through movement rather than words. It is especially associated with the talukas of Bicholim, Pernem and Sattari, where troupes rehearse the dance for weeks ahead of the festival, making it one of the most visually striking elements of Goa\u2019s Shigmo celebrations.',
        where: 'Bicholim, Pernem and Sattari during Shigmo',
        image: '/images/items/ghode-modni.png',
      },
      {
        name: 'Corridinho',
        summary: 'A spirited Portuguese folk dance performed by couples.',
        description:
          'Corridinho is a spirited couples\u2019 folk dance that arrived in Goa from the Algarve region of Portugal during the colonial period and became woven into the social life of the state\u2019s Catholic communities. Danced in pairs, it features quick, lively footwork and turns performed to upbeat instrumental music, often played on accordion, violin or brass instruments associated with Goan wedding bands. The dance is typically performed at weddings, feasts and cultural events, where it brings couples onto the floor for a fast-paced, joyful routine distinct from the slower, more formal dances also present in Goan Catholic tradition. Its survival in Goa reflects the broader pattern of Portuguese folk culture taking root and adapting within local communities over centuries of colonial contact, rather than remaining a purely imported curiosity. Today, Corridinho is performed at cultural showcases and community celebrations as a recognisable marker of Goa\u2019s Indo-Portuguese social heritage, often taught to younger generations through dance troupes and wedding entertainment traditions.',
        where: 'Weddings and cultural events in Goa\u2019s Catholic communities',
        image: '/images/items/corridinho.png',
      },
      {
        name: 'Goff',
        summary: 'A dance weaving colourful cords into a braid as dancers circle.',
        description:
          'Goff is a distinctive dance performed during the Shigmo festival in which each dancer holds one end of a coloured cord attached to a central pole. As the dancers move in coordinated circular patterns, weaving over and under one another, the cords gradually interlace into an intricate braided pattern around the pole; continuing the choreography in reverse then unravels the braid again. The dance demands considerable coordination and memorised patterning, since any misstep can tangle the cords incorrectly, making it as much a display of collective discipline as of individual skill. Performed to drumbeats and traditional Shigmo music, Goff is one of the visually striking set-pieces of the festival\u2019s village processions, admired for the geometric patterns that emerge from the dancers\u2019 movements. It is performed in rural areas across Goa during Shigmo, often by troupes that practise the sequence for weeks beforehand, and it stands alongside dances like Ghode Modni as one of the festival\u2019s most recognisable folk performances.',
        where: 'Rural Goa during the Shigmo festival',
        image: '/images/items/goff.png',
      },
      {
        name: 'Veerbhadra',
        summary: 'A powerful ritual dance invoking the fierce form of Shiva.',
        description:
          'Veerbhadra is a powerful ritual dance that invokes Veerbhadra, a fierce manifestation of Lord Shiva associated with destruction and protection. The lead dancer wears an elaborate headdress and costume befitting this fearsome deity and carries swords, performing vigorous, forceful movements intended to embody the deity\u2019s intensity rather than graceful or lyrical motion. The dance is performed as part of Shigmo celebrations in certain villages, particularly around Ponda and Sanguem, where it forms one of the ritual highlights of the festival\u2019s temple-linked processions. Because it depicts a wrathful divine form, the performance carries strong religious and symbolic weight beyond its role as entertainment, often understood as inviting the deity\u2019s protective power for the community during the festival period. Preparation for the Veerbhadra dance, including the elaborate costume and choreography, is typically handled by specific families or temple-linked troupes with hereditary knowledge of the performance, making it a more localised and ritually significant tradition compared to some of Goa\u2019s more widely performed folk dances.',
        where: 'Ponda and Sanguem during Shigmo',
        image: '/images/items/veerbhadra.png',
      },
      {
        name: 'Jagor',
        summary: 'An all-night folk theatre of song, dance and satire.',
        description:
          'Jagor is an all-night folk performance combining song, dance and comic sketches, traditionally held to seek blessings for the village and performed largely by the Gawda community and other local groups. The event typically unfolds through the night, mixing devotional songs and dance sequences with satirical skits that comment on local life, social issues or notable happenings, giving the performance both a sacred and an entertaining dimension. Because it runs continuously until dawn, Jagor functions as a communal gathering as much as a performance, drawing villagers together to watch, participate and stay awake through the night in a shared act of celebration and prayer. It is particularly associated with village grounds in areas such as Siolim and Pernem, where the tradition has been sustained by community organisers who arrange the event as part of the local festival calendar. Jagor offers a rare example of Goan folk performance that combines ritual intent with comic social commentary within a single, extended, community-wide event.',
        where: 'Village grounds, notably Siolim and Per\u00e9m',
        image: '/images/items/jagor.png',
      },
    ]),
  },
  {
    slug: 'monument',
    key: 'monument',
    image: '/images/cat-monument.png',
    tone: 'terracotta',
    items: withSlugs([
      {
        name: 'Basilica of Bom Jesus',
        summary: 'A UNESCO World Heritage church holding the relics of St. Francis Xavier.',
        description:
          'The Basilica of Bom Jesus is a UNESCO World Heritage Site and one of the finest examples of baroque architecture in India, completed in 1605 in what was then the flourishing city of Old Goa. Built from laterite stone with a relatively plain exterior contrasted by a richly decorated, gilded interior, the basilica was constructed under Jesuit patronage during the height of Portuguese colonial and missionary presence in Goa. It is best known for holding the mortal remains of St. Francis Xavier, the Jesuit missionary whose body is preserved in a silver casket and displayed within an ornate mausoleum inside the church. The saint\u2019s remains draw pilgrims and visitors from around the world, especially during the Feast of St. Francis Xavier each December and periodic expositions when the relics are put on public display. As part of the Churches and Convents of Goa UNESCO listing, the Basilica of Bom Jesus stands among the most historically and religiously significant structures in Old Goa.',
        where: 'Old Goa',
        image: '/images/items/basilica-of-bom-jesus.png',
      },
      {
        name: 'Se Cathedral',
        summary: 'One of the largest churches in Asia, dedicated to St. Catherine.',
        description:
          'The Se Cathedral, dedicated to St. Catherine of Alexandria, is one of the largest churches in Asia and a centrepiece of Old Goa\u2019s UNESCO-listed religious architecture. Built over the course of the sixteenth and seventeenth centuries, the cathedral reflects the Portuguese-Manueline architectural style, characterised by its imposing scale, ornate main altar and detailed stonework. Among its most famous features is the Golden Bell, renowned as one of the largest bells in Goa and celebrated for the depth and richness of its sound, which historically called worshippers and residents of Old Goa to prayer and important announcements. The cathedral\u2019s construction coincided with Old Goa\u2019s era as the capital of Portuguese India, when the city was a major centre of trade, administration and Catholic missionary activity in Asia. Today, the Se Cathedral remains an active place of worship and a major heritage site, drawing visitors interested in its grand main altar, historic bell and its role in the broader story of Old Goa\u2019s religious architecture.',
        where: 'Old Goa',
        image: '/images/items/se-cathedral.png',
      },
      {
        name: 'Church of St. Francis of Assisi',
        summary: 'A church with a Manueline doorway and richly painted interior.',
        description:
          'The Church of St. Francis of Assisi in Old Goa is notable for its Manueline-style doorway and its richly painted interior, which together mark it as an important example of the fusion of Portuguese and Goan artistic traditions. Inside, visitors find carved and gilded woodwork alongside painted panels depicting scenes from the life of St. Francis, executed with the ornamental detail characteristic of Goa\u2019s religious art of the period. The adjoining convent building has been repurposed to house the Archaeological Museum, which displays artefacts, sculptures and portraits related to Goa\u2019s Portuguese colonial and pre-colonial history, extending the site\u2019s significance beyond religious architecture into broader historical documentation. Located within the cluster of monuments that make up Old Goa\u2019s UNESCO World Heritage listing, the church and its museum together offer visitors both an architectural example of Manueline styling adapted to Goan building materials and a curated look at the wider historical narrative of the region through the museum\u2019s collection.',
        where: 'Old Goa',
        image: '/images/items/church-of-st-francis-of-assisi.png',
      },
      {
        name: 'Fort Aguada',
        summary: 'A 17th-century Portuguese fort with a historic lighthouse.',
        description:
          'Fort Aguada is a seventeenth-century Portuguese fort built in 1612 to defend Goa\u2019s coastline against threats from Dutch and Maratha forces during a period of intense regional competition for control of trade routes. Positioned at a strategic point along the coast near Candolim, the fort also served a practical role beyond defence: it supplied fresh water to ships passing along the trade route, thanks to a large freshwater spring within its walls, which gave the fort its name, derived from the Portuguese word for water. Its lighthouse, built later, is considered among the oldest of its kind in Asia and remains a recognisable landmark along Goa\u2019s northern coastline. The fort\u2019s thick laterite walls, bastions and moat reflect the military engineering typical of Portuguese coastal fortifications of the era. Today, Fort Aguada is one of Goa\u2019s most visited heritage sites, valued both for its historical role in coastal defence and for the sweeping views it offers over the Arabian Sea.',
        where: 'Candolim, North Goa',
        image: '/images/items/fort-aguada.png',
      },
      {
        name: 'Reis Magos Fort',
        summary: 'A restored fort overlooking the Mandovi river.',
        description:
          'Reis Magos Fort was built to guard the narrowest point of the Mandovi river estuary, a strategically vital location for controlling access to Goa\u2019s interior waterways during the Portuguese colonial period. Positioned on a hillside overlooking the river, the fort allowed defenders to monitor and, if necessary, block ships attempting to sail upriver toward the settlements further inland. Over the centuries the fort fell into disrepair, but it has since undergone careful restoration that returned its walls, ramparts and interior spaces to a condition suitable for public use. Today, Reis Magos Fort functions as a cultural centre, hosting exhibitions that explore Goan history, including its colonial past, its forts and its broader heritage, making it as much an educational resource as a historic monument. Its location in Reis Magos, in the Bardez taluka, also places it near other heritage sites along the Mandovi, and its restored ramparts offer visitors panoramic views across the river toward Panjim.',
        where: 'Reis Magos, Bardez',
        image: '/images/items/reis-magos-fort.png',
      },
      {
        name: 'Chapora Fort',
        summary: 'A laterite fort offering sweeping views of the coast.',
        description:
          'Chapora Fort stands on a headland above the Chapora river and the beach town of Vagator, built from local laterite stone by the Portuguese in 1717 on the site of an earlier fortification. Its elevated position gave defenders a wide vantage over both the river mouth and the surrounding coastline, making it valuable for monitoring seaborne traffic and guarding against incursions from rival powers active in the region. Much of the fort today survives as weathered, partially ruined walls and bastions rather than an intact structure, giving it a rugged, atmospheric character that has made it a popular destination for visitors seeking dramatic coastal views. From its highest points, the fort offers sweeping sightlines over Vagator beach, the river estuary and the Arabian Sea beyond, a vista that has made it one of the most photographed heritage sites in North Goa. Chapora Fort\u2019s blend of historical defensive function and scenic setting continues to draw both history-focused visitors and those simply seeking a striking viewpoint.',
        where: 'Vagator, Bardez',
        image: '/images/items/chapora-fort.png',
      },
      {
        name: 'Cabo de Rama Fort',
        summary: 'A clifftop fort linked to legends of Lord Rama.',
        description:
          'Cabo de Rama Fort sits on a dramatic clifftop in Canacona, South Goa, and takes its name from a local legend holding that Lord Rama and Sita rested here during their period of exile as described in the Ramayana. Long before Portuguese control, the site changed hands between several regional rulers, reflecting its strategic value as a defensible coastal position, before the Portuguese eventually fortified and held it as part of their broader network of coastal defences. Within the fort\u2019s grounds stands a small chapel, a later addition reflecting the site\u2019s continued use during the colonial period, set against the backdrop of the sea crashing against the cliffs far below. Much of the fort today exists in a weathered, partially ruined state, with sections of wall and old prison structures still visible to visitors exploring the site. Cabo de Rama\u2019s combination of legendary association, layered political history and striking cliff-edge setting makes it one of South Goa\u2019s most distinctive heritage locations.',
        where: 'Canacona, South Goa',
        image: '/images/items/cabo-de-rama-fort.png',
      },
      {
        name: 'Shri Mangueshi Temple',
        summary: 'A revered temple to Lord Mangesh with a striking deepastambha.',
        description:
          'Shri Mangueshi Temple, dedicated to Lord Mangesh, a form of Lord Shiva, is one of Goa\u2019s most revered Hindu temples, located in the village of Mangeshi in Ponda taluka. The temple is especially known for its seven-storey deepastambha, or lamp tower, a tall, whitewashed structure with tiers of small niches designed to hold oil lamps that are lit during festivals, creating a striking illuminated silhouette after dark. Its architecture combines domed roofs and design elements that reflect both temple-building traditions carried by Hindu communities who relocated inland during Portuguese religious suppression along the coast, and later local Goan influences absorbed over generations. A tranquil water tank on the temple grounds adds to its serene atmosphere and is used in certain temple rituals and for reflection by visiting devotees. As one of the most frequently visited temples in Goa, Shri Mangueshi Temple draws worshippers not only for daily prayer but for major festivals in the Hindu calendar, when its lamp tower and courtyards fill with devotees.',
        where: 'Mangeshi, Ponda',
        image: '/images/items/shri-mangueshi-temple.png',
      },
      {
        name: 'Shri Shantadurga Temple',
        summary: 'A grand temple to Goddess Shantadurga, the goddess of peace.',
        description:
          'Shri Shantadurga Temple, built in the eighteenth century, is dedicated to Goddess Shantadurga, whose name and legend are tied to a story in which she is believed to have mediated peace between the gods Vishnu and Shiva during a cosmic conflict, embodying the goddess of peace and harmony. The temple\u2019s architecture is distinguished by a roof design and layout that differ from typical South Indian temple forms, incorporating elements suited to Goa\u2019s Hindu temple-building tradition that developed after many temples relocated inland during the Portuguese colonial period. A tall lamp tower, similar in function to those seen at other major Goan temples, stands within the complex and is illuminated during festivals with rows of oil lamps. Located in Kavlem, within Ponda taluka, the temple draws worshippers from across Goa and neighbouring regions, particularly during major festival days associated with the goddess. Its grandeur and the symbolism of its patron deity make it one of the most significant Hindu pilgrimage sites in the state.',
        where: 'Kavlem, Ponda',
        image: '/images/items/shri-shantadurga-temple.png',
      },
      {
        name: 'Fontainhas Heritage Quarter',
        summary: 'Panjim\u2019s colourful Latin Quarter of winding lanes.',
        description:
          'Fontainhas is Panjim\u2019s historic Latin Quarter, a heritage neighbourhood known for its narrow, winding lanes lined with brightly painted houses in shades of ochre, blue, red and yellow, many featuring wrought-iron balconies and terracotta-tiled roofs. The quarter developed during the Portuguese colonial period as a residential area, and its architecture retains many hallmarks of that era, including azulejo tile nameplates displaying house names and family identities in the hand-painted blue-and-white style associated with Portuguese decorative art. Small chapels, old-fashioned bakeries and traditional Goan-Portuguese homes line its streets, preserving an atmosphere distinct from the busier commercial parts of Panjim that surround it. Because so much of its original built character has survived intact, Fontainhas is recognised as one of the best-preserved examples of Indo-Portuguese urban heritage in India, drawing visitors, photographers and heritage walks that explore its lanes on foot. The quarter functions as a living neighbourhood rather than a museum piece, with residents continuing to inhabit and maintain many of its historic homes.',
        where: 'Panjim',
        image: '/images/items/fontainhas-heritage-quarter.png',
      },
    ]),
  },
  {
    slug: 'musical-instrument',
    key: 'instrument',
    image: '/images/cat-instrument.png',
    tone: 'sea',
    items: withSlugs([
      {
        name: 'Ghumot',
        summary: 'Goa\u2019s heritage percussion instrument, an earthen pot drum.',
        description:
          'The ghumot is Goa\u2019s officially recognised heritage musical instrument, a percussion drum made from a hollow clay pot with a membrane traditionally stretched over one open end. Historically, the membrane was made from monitor lizard skin, a practice now discontinued and replaced with synthetic or other animal-skin alternatives due to conservation concerns. Played by striking the membrane with the palms and fingers, the ghumot produces a deep, resonant tone that has anchored Goan music for generations. It is heard in temple rituals, where it accompanies devotional aartis, and is especially prominent during Ganesh Chaturthi celebrations, providing rhythm for the songs sung in front of the household idol. The instrument is equally central to Goan folk music, including the mando, a traditional song form, where its steady beat underlies the melody. Because of its unique construction and its deep association with Goan religious and musical life, the ghumot was formally declared the heritage instrument of Goa, cementing its symbolic importance to the state\u2019s cultural identity.',
        where: 'Temples, homes and folk performances across Goa',
        image: '/images/items/ghumot.png',
      },
      {
        name: 'Dhol',
        summary: 'A large two-sided drum that drives festive processions.',
        description:
          'The dhol is a large, cylindrical two-headed drum whose deep, powerful beat drives many of Goa\u2019s most energetic festival processions, most notably during Shigmo. Played by striking both drumheads with sticks, often while the drum is slung over the player\u2019s shoulder for mobility through moving processions, the dhol produces a booming rhythm capable of carrying over crowds and long parade routes. Its sound sets the pace for folk dances performed during festivals, including the warrior dance Ghode Modni, where dancers\u2019 footwork is closely synchronised to the drummers\u2019 beat. The instrument is typically played in ensembles alongside other percussion, such as the tasha, creating layered, driving rhythms that build excitement as processions move through village streets. Beyond Shigmo, the dhol also appears at temple festivals and other celebratory occasions where a strong communal rhythm is needed to accompany dancing, singing or ceremonial movement. Its raw volume and rhythmic power make it one of the most recognisable sounds of Goan festive culture.',
        where: 'Shigmo processions and temple festivals',
        image: '/images/items/dhol.png',
      },
      {
        name: 'Tasha',
        summary: 'A sharp-sounding kettle drum played in festive ensembles.',
        description:
          'The tasha is a small kettle-shaped drum known for its sharp, rapid, high-pitched sound, which contrasts with and complements the deeper tones of the dhol in Goan percussion ensembles. Played with thin sticks that strike a tightly stretched skin membrane, the tasha produces quick, crackling rhythms that add texture and intensity to processional music. Dhol-tasha ensembles, combining both instruments, are a familiar sound during Shigmo and various religious processions across Goa, where their combined rhythms energise dancers and marchers alike as they move through village streets. The tasha\u2019s lighter weight and higher pitch allow players to execute rapid rhythmic patterns that would be difficult to achieve on larger drums, giving ensembles a layered, dynamic sound. Its role is typically supportive rather than solo, working in tandem with other drums to build the driving percussion base characteristic of Goan festival music. The instrument\u2019s continued use in contemporary processions reflects its lasting place within the state\u2019s traditional festive musical ensembles.',
        where: 'Festive processions throughout Goa',
        image: '/images/items/tasha.png',
      },
      {
        name: 'Kasale',
        summary: 'Brass cymbals that keep rhythm in devotional music.',
        description:
          'Kasale are small hand cymbals, typically made of brass or bronze, used to keep rhythm during devotional music such as bhajans and aartis in Goa. Played in pairs, one held in each hand, the cymbals are struck together to produce a bright, ringing sound that punctuates the beat, often played alongside the ghumot and other percussion in temple and household devotional settings. Their relatively simple construction and portability have made them a common instrument among devotees, allowing group participation in bhajan sessions without requiring specialised musical training. In temple contexts, kasale help mark the rhythm of chanted prayers and devotional songs, reinforcing the communal, participatory nature of Hindu worship in Goa. The instrument\u2019s steady, repetitive rhythm supports the vocal melody of bhajans, allowing singers to maintain tempo during extended devotional singing sessions. Kasale remain a familiar sound at temple gatherings and community bhajan mandals across Goa, valued for the simple but essential rhythmic foundation they provide to group devotional music.',
        where: 'Temples and bhajan gatherings',
        image: '/images/items/kasale.png',
      },
      {
        name: 'Shehnai',
        summary: 'A reed wind instrument heard at temples and weddings.',
        description:
          'The shehnai is a double-reed wind instrument whose bright, piercing, auspicious tone is traditionally associated with the opening of important ceremonies in Goa, including temple rituals and Hindu weddings. Made from a wooden body with a conical bore and a metal bell at the end, the instrument is played by blowing through a reed mouthpiece, requiring considerable breath control to sustain its distinctive, slightly nasal melodic lines. In temple settings, the shehnai is often played alongside percussion instruments as part of a traditional ensemble that accompanies rituals, its sound considered auspicious and appropriate for marking sacred occasions. At weddings, the shehnai similarly signals celebration, its melody accompanying key ceremonial moments as guests gather and rites are performed. Though more closely associated with North Indian classical and ceremonial music traditions broadly, the shehnai has been absorbed into Goan temple and wedding practice, reflecting the wider exchange of musical traditions across the subcontinent. Its presence at ceremonies underscores the instrument\u2019s continued ritual significance in Goan Hindu life.',
        where: 'Temple rituals and Hindu weddings',
        image: '/images/items/shehnai.png',
      },
      {
        name: 'Harmonium',
        summary: 'A hand-pumped keyboard central to bhajans and natya sangeet.',
        description:
          'The harmonium is a hand-pumped reed keyboard instrument that plays a central role in Goan devotional music and in Konkani and Marathi musical theatre, known as natya sangeet. Sound is produced by pumping air through bellows operated by one hand while the other hand plays the keyboard, pushing air across metal reeds tuned to different pitches. Its portability and relatively simple operation, compared to instruments requiring years of specialised technique, made it widely accessible for accompanying devotional singing at bhajan sessions and community gatherings across Goa. The instrument also became closely tied to musical theatre traditions performed in Konkani and Marathi, where harmonium accompaniment supports singers performing dramatic, sung dialogue and songs. Goa has produced numerous accomplished harmonium players and vocalists associated with these traditions, reflecting the instrument\u2019s importance within the state\u2019s broader musical culture. Its continued use at bhajan mandals, cultural programmes and theatrical performances across Goa demonstrates how an instrument of relatively recent introduction became deeply embedded in local musical life.',
        where: 'Bhajan sessions and music stages across Goa',
        image: '/images/items/harmonium.png',
      },
      {
        name: 'Violin',
        summary: 'A string instrument at the heart of Goan mando and church music.',
        description:
          'The violin entered Goan musical life through church music schools established during the Portuguese colonial period, where Western instrumental training became part of religious and cultural education. Over time, the instrument moved beyond church choirs to become essential to secular Goan music, particularly the mando and dulpod, traditional Konkani song forms that blend Indian melody with Western harmonic sensibilities. In church settings, the violin continues to accompany choirs and liturgical music, while in village and community settings it features in brass and string bands that perform at weddings, feasts and cultural events. Learning the violin in Goa historically often began within church-affiliated music education, producing generations of musicians skilled in both religious and folk repertoires. Its adaptable tonal range allows it to carry the expressive, often melancholic melodies characteristic of mando compositions, as well as livelier dance tunes at social gatherings. The violin\u2019s presence across both sacred and secular Goan music reflects the broader fusion of European and local musical traditions in the state.',
        where: 'Church music, mando performances and village bands',
        image: '/images/items/violin.png',
      },
      {
        name: 'Mandolin',
        summary: 'A small strummed string instrument loved in Goan folk music.',
        description:
          'The mandolin, a small, strummed string instrument known for its bright, sparkling tone, holds a cherished place in Goan folk and social music, particularly in mando and dulpod performances and at informal family serenades. Played by plucking or strumming its paired strings, often with a plectrum, the mandolin produces a light, cheerful sound well suited to accompanying vocal melodies at gatherings and celebrations. It is frequently played alongside the violin and guitar in small ensembles that perform at village feasts, family celebrations and cultural programmes, adding a layered, textured sound to traditional Goan songs. Its relatively compact size and easier portability, compared to larger stringed instruments, made it a popular choice for musicians performing informally at social occasions rather than in formal concert settings. The mandolin\u2019s association with serenading and festive music reflects its role in Goa\u2019s tradition of communal music-making, where songs are shared among family and neighbours during feasts, birthdays and other occasions rather than confined to staged performance.',
        where: 'Feasts, serenades and cultural events',
        image: '/images/items/mandolin.png',
      },
      {
        name: 'Tambura',
        summary: 'A drone instrument that supports classical singing.',
        description:
          'The tambura is a long-necked, unfretted drone instrument used to provide a continuous background tone that supports and anchors Indian classical vocal and instrumental performance. Its strings are plucked in a steady, repeating pattern rather than played melodically, producing a sustained drone that establishes the tonal centre against which a singer or instrumentalist performs, helping performers stay grounded in the correct pitch throughout a piece. Goa has a notable tradition of Hindustani classical music, supported by dedicated schools and performing artists, and within this tradition the tambura remains an indispensable accompanying instrument at concerts and temple festivals featuring classical repertoire. Though it does not carry the melody itself, the tambura\u2019s role is considered essential rather than merely decorative, since Indian classical music depends on a stable drone to frame improvisation and melodic development. Its continued presence at classical music concerts across Goa reflects the state\u2019s deeper engagement with Hindustani classical traditions alongside its better-known folk and Western-influenced music.',
        where: 'Classical music concerts and temple festivals',
        image: '/images/items/tambura.png',
      },
    ]),
  },
  {
    slug: 'festival',
    key: 'festival',
    image: '/images/cat-festival.png',
    tone: 'pink',
    items: withSlugs([
      {
        name: 'Goa Carnival',
        summary: 'A colourful pre-Lent celebration led by the legendary King Momo.',
        description:
          'Goa Carnival is a colourful pre-Lenten celebration held in the days leading up to the Christian season of Lent, marked by street parades, decorated floats, music and dance across the state\u2019s main towns. The festival is symbolically led by King Momo, a jovial figure who is said to take charge of Goa for the duration of the celebrations and formally invites residents and visitors to join in the festivities. Parades wind through Panjim, Margao, Vasco and Mapusa, with participants in costume, dancers performing on floats, and street parties extending late into the night, drawing large crowds from across the state and beyond. The tradition traces back to the Portuguese colonial period, when Carnival celebrations were introduced and gradually adapted into a distinctly Goan event blending European festive customs with local music and performance styles. Held annually in February or March, Goa Carnival has become one of the state\u2019s most widely recognised cultural events, attracting visitors specifically to witness its parades and street celebrations.',
        where: 'Panjim, Margao, Vasco and Mapusa (February\u2013March)',
        image: '/images/items/goa-carnival.png',
      },
      {
        name: 'Shigmo',
        summary: 'A spring festival of vibrant parades and folk dances.',
        description:
          'Shigmo is a spring festival celebrated across Goa to mark the changing of the season and, in local tradition, the return of warriors from battle, giving the festival both an agricultural and a martial dimension. Villages and towns organise elaborate processions featuring decorated floats, thunderous drumming and a range of folk dances performed by troupes that rehearse for weeks beforehand, including the warrior dance Ghode Modni and the cord-weaving dance Goff. The festival typically unfolds over several days, with smaller village-level celebrations preceding the larger city processions held in urban centres. Shigmo is celebrated by Goa\u2019s Hindu communities in particular, though its parades and festivities draw spectators from across religious and cultural backgrounds, making it one of the state\u2019s most visually spectacular public events. Taking place in March, timed to the arrival of spring, Shigmo showcases much of Goa\u2019s folk dance and percussion heritage in a single concentrated festival period, making it a key event for cultural preservation and public celebration alike.',
        where: 'Across Goa (March)',
        image: '/images/items/shigmo.png',
      },
      {
        name: 'Sao Joao',
        summary: 'The feast of St. John the Baptist, celebrated by leaping into wells.',
        description:
          'Sao Joao is the feast of St. John the Baptist, celebrated in Goa during the monsoon season with a distinctive tradition of jumping into wells, ponds and streams. Young men wear crowns made of leaves, flowers and fruit, known as kopels, before leaping into water bodies in a joyful, communal display that recalls the biblical account of John the Baptist leaping with joy while still in his mother\u2019s womb upon sensing the presence of Jesus. Villages, particularly in North Goa around Siolim, hold community celebrations where groups move from house to house, singing, dancing and jumping into any available body of water along the way, often accompanied by music and the sharing of food and drink. The festival is closely tied to the monsoon season, when wells and ponds are full, making the water-jumping tradition both practically possible and symbolically connected to the life-giving rains. Celebrated each June, Sao Joao remains one of the most distinctive and exuberant festivals within Goa\u2019s Catholic community.',
        where: 'Villages across North Goa, especially Siolim (June)',
        image: '/images/items/sao-joao.png',
      },
      {
        name: 'Ganesh Chaturthi',
        summary: 'Goa\u2019s biggest Hindu festival, welcoming Lord Ganesha home.',
        description:
          'Ganesh Chaturthi is widely regarded as Goa\u2019s biggest Hindu festival, marking the birth of Lord Ganesha and welcoming the deity into homes for several days of worship and celebration. Families install clay idols of Ganesha on a decorated altar, often framed by a matoli, a canopy woven from forest produce such as fruits, vegetables and flowers that symbolically links the festival to the harvest season. Throughout the festival, households sing aartis accompanied by the ghumot, Goa\u2019s heritage drum, and prepare an array of festive sweets, including modak, traditionally offered to the deity before being shared among family and guests. The idol is worshipped for a set number of days before being ceremonially immersed in a river, pond or the sea, a ritual known as visarjan that marks Ganesha\u2019s symbolic return to his celestial abode. Celebrated in August or September according to the Hindu lunar calendar, Ganesh Chaturthi brings together religious devotion, seasonal harvest symbolism and family gathering across Goa\u2019s towns and villages.',
        where: 'Homes and communities across Goa (August\u2013September)',
        image: '/images/items/ganesh-chaturthi.png',
      },
      {
        name: 'Diwali',
        summary: 'The festival of lights, marked by the burning of Narakasura effigies.',
        description:
          'Diwali, the festival of lights, is celebrated across Goa with a distinctive local tradition centred on the destruction of towering effigies of the demon Narakasura, symbolising the triumph of good over evil. In the pre-dawn hours, communities gather to burn these often elaborately constructed effigies, an event that draws large crowds and is frequently preceded by effigy-building competitions among local youth groups in the weeks leading up to the festival. Following the burning of Narakasura, the celebration shifts to the more familiar Diwali customs observed across India: homes are lit with rows of oil lamps and decorative lights, families exchange sweets, and firecrackers are set off to mark the festive occasion. The festival typically falls in October or November, according to the Hindu lunar calendar, and is celebrated by Hindu communities throughout Goa\u2019s towns and villages. The combination of the distinctly Goan Narakasura tradition with pan-Indian Diwali customs makes the festival a clear example of how national celebrations take on regional character within the state.',
        where: 'Towns and villages across Goa (October\u2013November)',
        image: '/images/items/diwali.png',
      },
      {
        name: 'Christmas',
        summary: 'A festive season of stars, cribs, carols and sweets.',
        description:
          'Christmas in Goa is celebrated with a festive season that blends religious observance with distinctive local customs shaped by the state\u2019s large Catholic population and Portuguese colonial heritage. Homes are decorated with paper stars hung in windows and handmade cribs depicting the nativity scene, often assembled with great care and sometimes entered into neighbourhood competitions. Midnight Mass draws large congregations to churches across the state on Christmas Eve, marking the religious heart of the celebration before festivities continue into Christmas Day itself. A central culinary tradition of the season is kuswar, a selection of traditional sweets and snacks including neuries, kulkuls and marzipan, prepared in the weeks before Christmas and shared generously with neighbours and visitors regardless of their faith. The preparation of kuswar is often a multi-day family affair, with different sweets requiring different techniques, from frying to shaping to baking. Celebrated throughout December, Christmas remains one of the most significant and widely shared festive seasons in Goa\u2019s cultural calendar.',
        where: 'Churches and homes across Goa (December)',
        image: '/images/items/christmas.png',
      },
      {
        name: 'Feast of St. Francis Xavier',
        summary: 'A major feast honouring Goa\u2019s patron saint.',
        description:
          'The Feast of St. Francis Xavier is a major religious observance honouring Goa\u2019s patron saint, whose preserved remains are held within the Basilica of Bom Jesus in Old Goa. The feast is marked by a novena, nine days of prayer and Mass leading up to the main feast day, drawing pilgrims from across Goa and beyond who gather to honour the saint\u2019s legacy as a missionary associated with the spread of Catholicism in the region. On periodic occasions, decided according to church tradition, the saint\u2019s relics are brought out of their usual resting place for a solemn public exposition, allowing pilgrims to view the remains directly, an event that draws exceptionally large crowds from within India and internationally. Even outside exposition years, the feast day itself, observed on the third of December, sees the basilica and its surroundings filled with devotees attending Mass and taking part in the wider religious and market atmosphere that builds around the celebration in Old Goa each year.',
        where: 'Old Goa (3 December)',
        image: '/images/items/st-francis-xavier.png',
      },
      {
        name: 'Bonderam',
        summary: 'A flag festival with parades on the island of Divar.',
        description:
          'Bonderam is a flag festival celebrated on Divar Island, with origins traced to historical disputes over property boundaries that were once settled by planting flags to mark ownership. What began as a practical, and at times contentious, method of resolving land disagreements evolved over time into a festive commemoration, transforming the memory of these boundary disputes into a colourful community celebration. Today, Bonderam features parades of decorated floats and participants carrying flags through the island\u2019s roads, accompanied by music and dance, in a lighthearted, carnival-like atmosphere rather than any actual land dispute. The festival is held annually on the fourth Saturday of August, drawing visitors to Divar Island specifically for the occasion, which stands out among Goan festivals for its unusual origin story rooted in local land administration history. Bonderam illustrates how a historical civic practice can be reinterpreted over generations into a purely celebratory event, preserving a piece of local history through festivity rather than formal record.',
        where: 'Divar Island (fourth Saturday of August)',
        image: '/images/items/bonderam.png',
      },
      {
        name: 'Chikhal Kalo',
        summary: 'A joyful mud festival celebrating Lord Krishna\u2019s childhood.',
        description:
          'Chikhal Kalo is a joyful monsoon festival celebrated in Marcel, Ponda, that recreates the playful, mischievous childhood of Lord Krishna through communal games played in mud. Devotees gather at temple grounds during the rains, when the earth is naturally soft and waterlogged, and take part in mud games and playful wrestling that deliberately mimic the youthful antics attributed to Krishna in Hindu tradition and mythology. The festival\u2019s name reflects its central activity, combining the Konkani and Marathi words for mud and play, and the event is treated as much a communal celebration of togetherness as a religious observance. Participants of various ages join in, and the event is typically accompanied by music, temple rituals and a general atmosphere of festive fun rather than solemn ceremony. Held in July, timed to the monsoon season when mud is naturally abundant, Chikhal Kalo remains a distinctive, localised festival specific to its host village, illustrating how Goa\u2019s Hindu festival traditions can take highly specific, community-particular forms tied to a single location.',
        where: 'Marcel, Ponda (July)',
        image: '/images/items/chikhal-kalo.png',
      },
      {
        name: 'Novidade',
        summary: 'A harvest festival offering the first rice sheaves.',
        description:
          'Novidade is a harvest festival observed in Goa\u2019s Catholic villages, marking the arrival of the season\u2019s first rice crop with a ceremony of thanksgiving held at local churches. Farmers bring freshly cut sheaves of paddy, the first gathered from that year\u2019s harvest, to be blessed by the parish priest during a special Mass or ceremony, acknowledging the land\u2019s yield and expressing gratitude for a successful growing season. Following the blessing, the sheaves are distributed among the congregation, sometimes symbolically shared or used in food preparation, connecting the religious ritual directly to the agricultural cycle that sustains rural Goan communities. The festival reflects the deep integration of Catholic religious practice with the agrarian rhythms of village life in Goa, where church calendars and farming seasons have long been intertwined. Celebrated in August across village churches throughout the state, Novidade stands as one of the clearer examples of how Goan Christian festivals incorporate distinctly local, agriculture-based customs alongside standard religious observance.',
        where: 'Village churches across Goa (August)',
        image: '/images/items/novidade.png',
      },
    ]),
  },
  {
    slug: 'food',
    key: 'food',
    image: '/images/cat-food.png',
    tone: 'gold',
    items: withSlugs([
      {
        name: 'Goan Fish Curry',
        summary: 'The everyday staple: fish in a tangy coconut gravy with rice.',
        description:
          'Goan fish curry, eaten with rice, is the everyday staple of the Goan table, prepared in most households on a near-daily basis using fresh fish sourced from local markets. The curry\u2019s base combines grated coconut, red chillies and a souring agent, typically kokum or tamarind, ground together into a smooth gravy in which pieces of fish are simmered until cooked through. Variations exist across communities and households, with differing spice blends and choices of fish depending on the day\u2019s catch and family preference, but the fundamental combination of coconut, chilli and sour fruit remains consistent throughout the state. This dish reflects Goa\u2019s coastal geography and its reliance on the Arabian Sea for a significant part of its diet, as well as the widespread cultivation of coconut across the region. Served over plain steamed rice, fish curry rice is considered the quintessential Goan meal, eaten by families of different religious and social backgrounds alike, making it arguably the single most representative dish of everyday Goan cuisine.',
        where: 'Homes and local eateries across Goa',
        image: '/images/items/goan-fish-curry.png',
      },
      {
        name: 'Pork Vindaloo',
        summary: 'A fiery, tangy pork curry with Portuguese roots.',
        description:
          'Pork Vindaloo is a fiery, tangy curry that evolved from the Portuguese dish carne de vinha d\u2019alhos, meaning meat marinated in wine and garlic, brought to Goa during the colonial period. Over generations, the dish was adapted using local ingredients and spice combinations, with Goan cooks replacing or supplementing wine with vinegar and introducing red chillies, giving the dish its distinctive sharp, tangy heat that distinguishes it from its Portuguese ancestor. Preparation typically involves marinating pork in a paste of vinegar, garlic, ginger and a blend of spices for a period before slow-cooking it into a thick, richly flavoured curry. The dish is strongly associated with Goa\u2019s Catholic community, where it frequently appears at celebratory meals, family gatherings and festive occasions such as Christmas and weddings. Pork Vindaloo has also become one of the most internationally recognised Goan dishes, often cited as an example of the culinary fusion produced by centuries of Portuguese colonial presence combined with local Goan ingredients and cooking techniques.',
        where: 'Goan Catholic homes and restaurants',
        image: '/images/items/pork-vindaloo.png',
      },
      {
        name: 'Chicken Cafreal',
        summary: 'Chicken marinated in a vibrant green masala and pan-fried.',
        description:
          'Chicken Cafreal is a vibrant green dish made by marinating chicken pieces in a bright masala paste of fresh coriander leaves, green chillies, garlic, ginger and a blend of spices, before pan-frying or grilling until cooked through. The dish\u2019s name and origins are linked to Portuguese and African culinary influences, reflecting the wider network of trade and colonial connections that shaped Goan cuisine, with the cooking technique and use of green herb-based marinades echoing preparations found in parts of Portuguese-influenced Africa. Over time, the dish was fully absorbed into Goan Catholic home cooking and restaurant menus, becoming one of the state\u2019s most popular chicken preparations. It is commonly served with a side of fried potatoes or rice and is a frequent feature on menus at taverns and restaurants across Goa, particularly in areas popular with visitors. Chicken Cafreal\u2019s distinctive green colour and herby, spicy flavour make it instantly recognisable and one of the more visually striking dishes within Goan cuisine.',
        where: 'Taverns and restaurants across Goa',
        image: '/images/items/chicken-cafreal.png',
      },
      {
        name: 'Goan Xacuti',
        summary: 'A rich curry of roasted coconut and complex spices.',
        description:
          'Xacuti is a richly aromatic curry built on a base of roasted grated coconut and a complex blend of dry-roasted spices, ground together to create a deeply flavoured gravy typically used to cook chicken or mutton. The roasting process is central to the dish\u2019s character: coconut and whole spices such as poppy seeds, coriander and dried chillies are toasted before grinding, which develops a darker, more intense flavour profile than curries made with raw or lightly cooked spice pastes. This method reflects broader culinary techniques found in Goan and coastal Konkan cooking, where roasting spices before grinding is used to achieve depth of flavour suited to slow-cooked meat dishes. Xacuti is prepared in both Hindu and Catholic Goan households, though recipes and specific spice combinations can vary between families and communities. Served with rice or bread, Xacuti is considered one of the more complex and labour-intensive curries in Goan cuisine, valued for its distinctive roasted, nutty depth compared to the brighter, more acidic profile of dishes like fish curry.',
        where: 'Homes and restaurants across Goa',
        image: '/images/items/goan-xacuti.png',
      },
      {
        name: 'Sorpotel',
        summary: 'A spicy, vinegar-laced pork dish served at feasts.',
        description:
          'Sorpotel is a celebratory dish made from pork and offal, cooked in a thick gravy flavoured with vinegar and a robust blend of spices, traditionally prepared for weddings, feasts and festive occasions such as Christmas. The dish\u2019s preparation is notably labour-intensive, involving the cooking of various pork cuts and organ meats together with the tangy vinegar-spice base, and Sorpotel is widely considered to taste even better after resting for a day or two, as the flavours continue to develop and deepen over time. This practice of preparing it in advance made it particularly well suited to large celebratory gatherings, where cooks could ready the dish ahead of the event itself. Sorpotel is traditionally eaten with sannas, the soft steamed rice cakes that provide a mild, absorbent counterpart to the dish\u2019s rich, spicy intensity. Strongly associated with Goa\u2019s Catholic community and its festive culinary calendar, Sorpotel remains one of the most distinctive and labour-intensive dishes within the broader tradition of Goan pork cookery.',
        where: 'Weddings, feasts and Christmas tables',
        image: '/images/items/sorpotel.png',
      },
      {
        name: 'Bebinca',
        summary: 'The queen of Goan desserts, a layered coconut cake.',
        description:
          'Bebinca, often described as the queen of Goan desserts, is a rich, layered cake made from a batter of coconut milk, eggs, sugar and ghee, baked one thin layer at a time until many thin layers build into a single dessert. Each layer must be individually baked and browned before the next is poured on top, a slow and painstaking process that can take hours to complete, making Bebinca a labour of patience as much as culinary skill. The result is a dense, richly flavoured cake with a distinctive striped cross-section when sliced, showing off the many thin layers created during baking. Bebinca is closely associated with Christmas and other major festive occasions in Goa\u2019s Catholic community, where it is often prepared at home by families following recipes passed down through generations, though it is also sold at bakeries across the state. Its slow preparation and rich ingredients have made Bebinca a centrepiece dessert reserved for special celebrations rather than everyday eating.',
        where: 'Bakeries and homes, especially at Christmas',
        image: '/images/items/bebinca.png',
      },
      {
        name: 'Sannas',
        summary: 'Soft, spongy steamed rice cakes.',
        description:
          'Sannas are soft, spongy, steamed rice cakes made from a fermented batter of ground rice and coconut, traditionally leavened using toddy, the fermented sap of the coconut palm, which gives the batter its characteristic rise and slightly tangy flavour. The batter is left to ferment for several hours before being steamed in small moulds, producing light, fluffy cakes similar in texture to idli but with a distinct flavour derived from the coconut and fermentation process. Sannas are prized for their ability to soak up rich, spicy gravies without becoming soggy too quickly, making them the traditional accompaniment to dishes like Sorpotel and other robust Goan curries. They are commonly served at both everyday meals and festive occasions, including weddings and Christmas feasts, where their mild flavour provides balance against more intensely spiced dishes. As toddy has become harder to source in some areas, some modern preparations substitute other leavening agents, though the traditional toddy-fermented version remains the benchmark for authentic sannas.',
        where: 'Homes and feasts across Goa',
        image: '/images/items/sannas.png',
      },
      {
        name: 'Poi',
        summary: 'A wholesome, pocket-shaped bread baked by the poders.',
        description:
          'Poi is a traditional Goan bread made from wheat flour, often incorporating wheat bran, baked into a distinctive pocket-shaped loaf with a slightly chewy crust and soft interior. The bread is traditionally prepared by the poder, or village baker, in wood-fired ovens and delivered fresh each morning by bicycle to homes across Goan villages and towns, a delivery tradition that has become closely associated with daily Goan life. Its pocket shape makes poi well suited to being split open and stuffed or dipped into curries and gravies, and it is commonly eaten alongside dishes such as ros omelette or various curries at both breakfast and other meals throughout the day. The poder\u2019s bicycle bell announcing the morning bread delivery has long been a familiar sound in Goan neighbourhoods, though the tradition has diminished somewhat as bakeries and modern retail have expanded. Poi remains a staple bread across Goa, valued both for its practical role in daily meals and its association with a distinctly local baking and delivery tradition.',
        where: 'Village bakeries across Goa',
        image: '/images/items/poi.png',
      },
      {
        name: 'Ros Omelette',
        summary: 'A beloved street food of omelette drenched in spicy gravy.',
        description:
          'Ros omelette is a popular Goan street food dish that pairs a fluffy, simply seasoned omelette with ros, a spicy gravy typically made with chicken or, in vegetarian versions, chickpeas, ladled generously over the top. The dish is usually served alongside poi, the pocket-shaped local bread, which is used to soak up the flavourful gravy alongside the egg. Ros omelette is especially popular as an evening street food, sold from small carts and stalls that set up in the evenings in busy areas, drawing regular customers looking for an affordable, filling snack. Its popularity in towns such as Panjim and Margao reflects its status as a beloved local comfort food, straddling the line between a light meal and a hearty snack depending on portion size. The combination of a familiar, simply prepared omelette with a rich, spiced gravy exemplifies a broader pattern in Goan street food, where everyday ingredients are elevated through flavourful sauces rather than complex individual components.',
        where: 'Street food carts, especially in Panjim and Margao',
        image: '/images/items/ros-omelette.png',
      },
      {
        name: 'Kokum Sherbet',
        summary: 'A cooling, ruby-red drink made from kokum fruit.',
        description:
          'Kokum sherbet is a cooling, deep ruby-red drink prepared from the dried rind of the kokum fruit, a fruit native to the Western Ghats region that includes Goa, combined with sugar and a light blend of spices to create a refreshing beverage. The kokum rind is typically soaked, boiled or otherwise processed to extract its tart, fruity flavour and characteristic colour before being sweetened and diluted to drinking strength, sometimes with a pinch of cumin or other spices added for extra depth. Beyond its refreshing taste, kokum is traditionally valued for its digestive properties, and the sherbet is often consumed after meals or during particularly hot weather as a cooling, palate-cleansing drink. It is commonly found in Goan homes, where families prepare it from stored kokum rind, as well as in local cafes and shops that sell it ready-made, particularly during the warmer months. Kokum sherbet reflects the broader Goan and Konkan coastal use of kokum as both a culinary souring agent and a health-conscious beverage ingredient.',
        where: 'Homes, cafes and local shops across Goa',
        image: '/images/items/kokum-sherbet.png',
      },
    ]),
  },
  {
    slug: 'regional-board-game',
    key: 'game',
    image: '/images/cat-game.png',
    tone: 'green',
    items: withSlugs([
      {
        name: 'Tabul Phale',
        summary: 'A traditional race game played with flat throwing sticks.',
        description:
          'Tabul Phale is a traditional race game played using flat wooden sticks, marked distinctively on one side, which are thrown to determine how far a player\u2019s piece can move along a board. Players take turns tossing the sticks and reading the combination of marked and unmarked sides that land face up, similar in principle to dice, to calculate their move for that turn. The game was once a popular pastime in Goan homes, particularly played during festivals and periods of leisure when extended family and neighbours gathered together with time to spend on board games. As with many traditional Indian board and race games, Tabul Phale combines an element of luck, determined by how the sticks fall, with strategic decisions about how to advance pieces most effectively toward the finish. Though less commonly played in everyday life today, the game has found renewed interest through heritage revival events and cultural programmes seeking to preserve traditional Goan pastimes for younger generations who might otherwise have no exposure to it.',
        where: 'Traditional households and heritage revival events',
        image: '/images/items/tabul-phale.jpg',
      },
      {
        name: 'Pachisi variants',
        summary: 'Cross-shaped race games played with cowrie shells.',
        description:
          'Pachisi variants are cross-shaped race games played across Goa on cloth boards patterned in the traditional four-armed cross layout associated with this widely known Indian game family. Players use cowrie shells, thrown much like dice, to determine how many spaces their pieces may move along the board\u2019s marked path, racing to bring all their pieces safely home while navigating rules that can send opposing pieces back to start if landed upon. The game has many regional variants across India, and Goan households have their own versions and house rules passed down within families, often played during festivals or as a way to pass time on quiet afternoons and evenings. Playing Pachisi socially brings together players of different ages, as the rules are simple enough for children to grasp while still allowing for tactical decision-making that keeps adult players engaged. It remains a recognisable, if increasingly nostalgic, part of Goan festive home life, particularly among families that continue to hand down cloth boards and rules across generations.',
        where: 'Homes across Goa, especially during festivals',
        image: '/images/items/pachisi-variants.png',
      },
      {
        name: 'Chowka Bara variants',
        summary: 'Grid-based race games played with cowries or tamarind seeds.',
        description:
          'Chowka Bara\u2013style games are traditional race and strategy games played on square grids, often drawn directly on the floor or a verandah rather than requiring a purpose-made board. Players move their counters around the grid based on throws of cowrie shells, with the specific combination of shells landing face up or face down determining how many spaces a piece may advance, blending an element of chance with the strategic choice of which piece to move. These games are typically played in casual, informal settings such as village homes and verandahs, where players simply sketch out the grid using chalk or a similar marker when they wish to play. Chowka Bara\u2013style games are part of a broader family of South Indian traditional board games that use similarly simple materials and grid-based movement, adapted with local rules and variations within Goa. Though requiring no special equipment beyond cowrie shells and a drawn grid, these games demand genuine strategic thinking, making them enduringly popular as accessible, low-cost entertainment in village settings.',
        where: 'Village homes and verandahs',
        image: '/images/items/chowka-bara.png',
      },
      {
        name: 'Traditional Mancala games',
        summary: 'Pit-and-seed counting games played on wooden boards.',
        description:
          'Traditional Mancala games belong to a globally distributed family of pit-and-seed counting games, played in Goa on wooden boards carved with rows of small pits into which seeds, shells or small stones are sown and captured according to specific rules. Players take turns picking up all the pieces from one pit and distributing them one by one into subsequent pits, with the specific rules of the variant determining how and when a player may capture their opponent\u2019s pieces, gradually accumulating pieces in a designated store. The game builds counting skills and strategic thinking, since successful play depends on planning several moves ahead to set up favourable captures while avoiding leaving pits vulnerable to the opponent. In Goa, as elsewhere in India, mancala-style games were traditionally played by both children and elders, making them a genuinely intergenerational pastime rather than one confined to a particular age group. Rural homes and school-based heritage activities have helped keep the games known even as their everyday presence in households has declined.',
        where: 'Rural homes and school heritage activities',
        image: '/images/items/traditional-mancala.png',
      },
      {
        name: 'Goti',
        summary: 'A game of small stones or marbles tossed and captured.',
        description:
          'Goti is a traditional game played with small stones, seeds or marbles, testing players\u2019 hand-eye coordination and dexterity as they toss, catch and capture pieces during their turn. Typical gameplay involves scattering a set of small pieces on the ground, then tossing one piece into the air while attempting to pick up others from the ground and catch the tossed piece before it lands, with increasing difficulty as fewer pieces remain to support the hand\u2019s balance. The game requires no special equipment beyond small, easily gathered objects such as pebbles or seeds, making it accessible to children in any village setting without cost or preparation. Goti has traditionally been played in village courtyards and schoolyards across Goa, often during breaks or free time, as a simple but skill-testing pastime that children could organise spontaneously among themselves. Variants of similar stone- or seed-tossing games exist across many parts of India, and Goa\u2019s version reflects this broader tradition of simple, skill-based children\u2019s games using freely available natural materials.',
        where: 'Village courtyards and schoolyards',
        image: '/images/items/goti.png',
      },
      {
        name: 'Logorio',
        summary: 'A team game of stacking stones and dodging the ball.',
        description:
          'Logorio is a traditional team game combining elements of throwing, dodging and rebuilding, played by two teams competing over a stack of flat stones set up as a target. One team attempts to knock down the stacked stones using a ball thrown from a set distance, and once the stack is toppled, that team must then work together to rebuild it into its original stacked form before being tagged out by the opposing team, who use the ball to try to hit them while they attempt the rebuild. The game demands a combination of throwing accuracy to topple the stack, teamwork and speed to rebuild it, and agility to dodge the ball while doing so, making it a physically active, fast-paced pastime. Logorio has traditionally been played on open village grounds across Goa, where enough space is available for the throwing, dodging and running the game requires. As a team-based outdoor game, it has traditionally served as both entertainment and physical exercise for children and young people in rural Goan communities.',
        where: 'Village grounds across Goa',
        image: '/images/items/lagori.png',
      },
      {
        name: 'Faatraani',
        summary: 'A strategy game played with stones on a drawn board.',
        description:
          'Faatraani is a traditional strategy game played using stones as pieces on a board of lines drawn directly on the ground, requiring players to plan and execute moves that outmanoeuvre their opponent within the game\u2019s fixed layout. Players place and move their stone pieces along the intersecting lines of the drawn board, aiming to capture opposing pieces or achieve a winning configuration depending on the specific rules followed, in a manner broadly comparable to other traditional line-and-stone strategy games found across rural India. Because the board itself is simply drawn on any suitable flat surface, such as a courtyard floor, Faatraani requires no purchased equipment, only stones gathered nearby and a stick or chalk to mark the lines, making it accessible to anyone with a little space and time. The game has traditionally been played in rural Goa, often by adults and older children capable of following its strategic demands, distinguishing it somewhat from purely chance-based games aimed at younger players. It remains a marker of traditional Goan strategic pastimes rooted in simple, locally available materials.',
        where: 'Rural Goa, played on floors and courtyards',
        image: '/images/items/faatraani.png',
      },
      {
        name: 'Khambyaani',
        summary: 'A lively game played around pillars.',
        description:
          'Khambyaani is a lively traditional game played by children around the pillars of a house, temple or other structure, in which players attempt to reach and touch a designated pillar before being caught by whoever is \u2018it\u2019 in that round of play. The game combines elements of tag and hide-and-seek, as players dart between and around pillars, using the structure\u2019s layout to dodge and evade the chaser while racing to safely reach their target pillar. Because it depends on the physical layout of pillared buildings, Khambyaani was traditionally played wherever such architecture was available, including temple halls and the verandahs of traditional Goan homes that often featured rows of wooden or stone pillars. The game required no equipment at all beyond the players themselves and a suitable pillared space, making it a spontaneous, easily organised activity for groups of children with time to play. Though it depends on architectural features less common in modern housing, Khambyaani remains remembered as part of the repertoire of traditional outdoor children\u2019s games once common in Goan village life.',
        where: 'Traditional homes and temple halls',
        image: '/images/items/khambyaani.png',
      },
    ]),
  },
]

export const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0)

/** Flat list of every heritage item paired with its category. */
export const allItems = categories.flatMap((category) =>
  category.items.map((item) => ({ category, item })),
)

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

/** Resolve a "categorySlug/itemSlug" key back to its category + item. */
export function getItemByKey(key: string) {
  const [slug, itemSlug] = key.split('/')
  if (!slug || !itemSlug) return undefined
  return getItem(slug, itemSlug)
}

export function getItem(categorySlug: string, itemSlug: string) {
  const category = getCategory(categorySlug)
  const index = category?.items.findIndex((i) => i.slug === itemSlug) ?? -1
  if (!category || index === -1) return undefined
  return {
    category,
    item: category.items[index],
    prev: category.items[index - 1],
    next: category.items[index + 1],
  }
}
