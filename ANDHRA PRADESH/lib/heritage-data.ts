export type Tone = "orange" | "red" | "gold" | "wood" | "leaf" | "coastal"

export type HeritageItem = {
  slug: string
  name: string
  location: string
  summary: string
  description: string
  image: string
  imageAlt: string
}

export type HeritageCategory = {
  slug: string
  name: string
  singular: string
  tagline: string
  intro: string
  image: string
  imageAlt: string
  tone: Tone
  items: HeritageItem[]
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

type RawItem = Omit<HeritageItem, "slug" | "image" | "imageAlt"> & { image?: string }

function withSlugs(categorySlug: string, items: RawItem[]): HeritageItem[] {
  return items.map((item) => {
    const slug = slugify(item.name)
    return {
      ...item,
      slug,
      image: item.image ?? `/images/items/${categorySlug}/${slug}.webp`,
      imageAlt: `${item.name}, ${item.location}`,
    }
  })
}

export const categories: HeritageCategory[] = [
  {
    slug: "art",
    name: "Art",
    singular: "Art & Craft",
    tagline: "Hands that shape wood, brass, stone and silk",
    intro:
      "From the lacquered toys of Etikoppaka to the silk looms of Uppada, the crafts of Andhra Pradesh are living traditions passed down through artisan families across coastal Andhra, Uttarandhra and Rayalaseema.",
    image: "/images/cat-art.webp",
    imageAlt: "Painted Kondapalli and Etikoppaka wooden toys arranged on cream cloth",
    tone: "wood",
    items: withSlugs("art", [
      {
        name: "Kondapalli Toys",
        location: "Kondapalli, NTR District",
        summary: "Feather-light figurines carved from soft Tella Poniki wood and painted in bright enamel and vegetable colours.",
        description:
          "Artisans of Kondapalli carve village scenes, deities, animals and the famous Dasavatara sets from the soft Tella Poniki wood that grows in the nearby hills. Each piece is shaped by hand, joined with tamarind-seed paste and finished in vivid colours, making Kondapalli bommalu a centrepiece of Sankranti doll displays.",
      },
      {
        name: "Etikoppaka Toys",
        location: "Etikoppaka, Anakapalli District",
        summary: "Smooth, rounded lacquerware toys turned on a lathe and coloured with natural dyes.",
        description:
          "On the banks of the Varaha river, Etikoppaka craftsmen turn Ankudu wood on a lathe and coat it with lac coloured using seeds, bark, roots and leaves. The result is child-safe toys, tops and kitchen sets with a glossy, seamless finish, recognised with a Geographical Indication tag.",
      },
      {
        name: "Kalamkari Craft",
        location: "Srikalahasti & Machilipatnam",
        summary: "Textile art made with a bamboo pen (kalam) or carved wooden blocks and natural mordant dyes.",
        description:
          "Kalamkari fabric passes through as many as seventeen stages of bleaching, mordanting, drawing, dyeing and washing in running water. Srikalahasti artisans draw freehand with the kalam, while Machilipatnam workshops are known for intricate block printing, both relying on dyes from pomegranate rind, indigo, madder and jaggery-iron solutions.",
      },
      {
        name: "Budithi Brassware",
        location: "Budithi, Srikakulam District",
        summary: "Hand-beaten brass and bell-metal vessels with distinctive ribbed and etched surfaces.",
        description:
          "The metalsmiths of Budithi hammer and cast brass and bell metal into water pots, lamps, bowls and ritual vessels. Their signature ridged patterns and warm golden finish have made Budithi ware a sought-after household and devotional craft of northern Andhra.",
      },
      {
        name: "Durgi Stone Carving",
        location: "Durgi, Palnadu District",
        summary: "Soft-stone sculpture carrying forward the classical carving idiom of the Krishna valley.",
        description:
          "Durgi sculptors work locally quarried soft stone into deities, dancers and decorative panels inspired by the Buddhist and temple sculpture of the Krishna river region. Fine chisel work and graceful proportions distinguish the pieces, many of which adorn temples and public spaces.",
      },
      {
        name: "Uppada Weaving",
        location: "Uppada, Kakinada District",
        summary: "Lightweight silk sarees woven in the jamdani technique with motifs inlaid directly on the loom.",
        description:
          "Weavers in the coastal village of Uppada insert extra weft threads by hand to create floating motifs of zari and colour on sheer silk. A single saree can take weeks to finish, and its featherlight drape has earned Uppada Jamdani a Geographical Indication tag.",
      },
      {
        name: "Mangalagiri Handloom",
        location: "Mangalagiri, Guntur District",
        summary: "Fine cotton fabrics and sarees with crisp texture and the signature Nizam zari border.",
        description:
          "Mangalagiri weavers work on pit looms to produce tightly woven cotton with a gentle sheen and no extra-weft body designs, letting the solid colours and gold-thread borders speak. The fabric is prized for comfort in the warm coastal climate.",
      },
      {
        name: "Leather Puppetry",
        location: "Nimmalakunta, Sri Sathya Sai District",
        summary: "Tholu Bommalata: translucent, painted leather puppets that bring epics to life in shadow theatre.",
        description:
          "Puppeteer families of Nimmalakunta cut, perforate and paint treated goat and deer hide into figures that can stand over five feet tall. Lit from behind, the jointed puppets cast glowing coloured shadows as performers narrate the Ramayana and Mahabharata with songs and dialogue.",
      },
    ]),
  },
  {
    slug: "painting",
    name: "Painting",
    singular: "Painting",
    tagline: "Stories told in natural dyes, pigment and plaster",
    intro:
      "Andhra Pradesh's painting traditions span dye-drawn textiles, temple ceilings and storytelling scrolls, each rooted in devotion and oral narrative.",
    image: "/images/cat-painting.webp",
    imageAlt: "Close-up of a hand-drawn Kalamkari textile with mythological figures",
    tone: "orange",
    items: withSlugs("painting", [
      {
        name: "Kalamkari",
        location: "Srikalahasti, Tirupati District",
        summary: "Freehand narrative painting on cloth, drawn with a tamarind-twig kalam.",
        description:
          "Srikalahasti Kalamkari painters sketch epic scenes, temple chariots and deities onto mordanted cotton using charcoal from tamarind twigs, then fill them with natural reds, ochres, indigos and blacks. Panels are often read like a comic strip, with Telugu captions guiding the story.",
      },
      {
        name: "Lepakshi Painting",
        location: "Lepakshi, Sri Sathya Sai District",
        summary: "Vijayanagara-era ceiling murals renowned for elongated figures and elaborate costumes.",
        description:
          "The ceilings of the Veerabhadra temple at Lepakshi hold some of the largest surviving murals of the Vijayanagara period. Painted in earthy mineral colours, they depict episodes from the epics and Puranas with detailed textiles, jewellery and courtly life.",
      },
      {
        name: "Cheriyal-influenced Folk Art",
        location: "Telugu folk storytelling communities",
        summary: "Bold, red-ground narrative imagery drawn from the Cheriyal scroll idiom of the Telugu lands.",
        description:
          "Folk painters working in the Cheriyal-influenced style use flat red backgrounds, strong outlines and expressive faces to illustrate village life and legends. The idiom continues in panels, masks and storytelling props used across Telugu-speaking regions.",
      },
      {
        name: "Temple Murals",
        location: "Temples across Andhra Pradesh",
        summary: "Painted mandapa ceilings and walls from the Vijayanagara and Nayaka periods.",
        description:
          "Across Rayalaseema and coastal Andhra, temple mandapas preserve painted ceilings and walls showing deities, processions and festivals. Created with lime plaster and natural pigments, these murals document costume, architecture and devotional practice of their time.",
      },
      {
        name: "Nirmal-style Decorative Art in the region",
        location: "Regional decorative workshops",
        summary: "Lacquer-finished painted woodwork with gold highlights and delicate floral and courtly motifs.",
        description:
          "Decorative painters in the region adopt the Nirmal style of layering herbal extracts and lacquer on wood, then painting miniature-like scenes, birds and flowers with fine brushes and gold detailing. The style appears on trays, boxes, panels and furniture.",
      },
      {
        name: "Scroll Painting Traditions",
        location: "Itinerant storyteller communities",
        summary: "Long painted cloth scrolls unrolled scene by scene during sung performances.",
        description:
          "Scroll painters create vertical cloth scrolls that can run many metres, each frame showing one episode of a caste purana or epic. Travelling storytellers unroll them in village squares, singing the narrative to the rhythm of drums and cymbals.",
      },
    ]),
  },
  {
    slug: "dance",
    name: "Dance",
    singular: "Dance",
    tagline: "Rhythm from the temple courtyard to the forest clearing",
    intro:
      "Classical grace, martial vigour and tribal celebration all find expression in the dances of Andhra Pradesh, performed at temples, harvests and village festivals.",
    image: "/images/cat-dance.webp",
    imageAlt: "Kuchipudi dancer in orange and red silk costume striking a pose",
    tone: "red",
    items: withSlugs("dance", [
      {
        name: "Kuchipudi",
        location: "Kuchipudi, Krishna District",
        summary: "Classical dance-drama blending fast footwork, expressive storytelling and the brass-plate Tarangam.",
        description:
          "Born in the village of Kuchipudi, this classical form combines nritta, nritya and natya. Its best-known item, the Tarangam, has dancers perform balanced on the rim of a brass plate, sometimes with a pot of water on the head.",
      },
      {
        name: "Veeranatyam",
        location: "Draksharamam, East Godavari",
        summary: "A powerful ritual dance in honour of Veerabhadra, performed with fire and fierce energy.",
        description:
          "Veeranatyam, the dance of the brave, is performed at Shiva temples by the Veeramusti community. Dancers move vigorously to drums and trumpets, sometimes piercing their skin or holding fire, recalling Veerabhadra's fury at Daksha's sacrifice.",
      },
      {
        name: "Kolattam",
        location: "Villages across Andhra Pradesh",
        summary: "A joyous stick dance performed in circles, with rhythmic striking of painted sticks.",
        description:
          "Groups of dancers holding a pair of short painted sticks move in circles and weaving patterns, striking the sticks together in time with folk songs. Kolattam is a highlight of Sankranti and village jataras.",
      },
      {
        name: "Dhimsa",
        location: "Araku Valley, Alluri Sitharama Raju District",
        summary: "A tribal group dance of the Eastern Ghats, performed with linked arms to the beat of drums.",
        description:
          "Performed by adivasi communities of the Araku hills, Dhimsa sees women and men link arms in lines and circles, stepping in unison to drums and pipes. It marks festivals, weddings and harvests and is now a symbol of the Araku region.",
      },
      {
        name: "Lambadi Dance",
        location: "Lambadi (Banjara) settlements",
        summary: "Swirling dance of the Lambadi community in mirror-work skirts, bangles and silver jewellery.",
        description:
          "Lambadi women perform this dance in brilliantly embroidered costumes studded with mirrors, cowries and coins. Movements echo agricultural work such as sowing and harvesting, and are performed during festivals like Holi and Teej.",
      },
      {
        name: "Butta Bommalu",
        location: "Tanuku, West Godavari District",
        summary: "Basket-doll dance in which performers wear giant masked figures and sway to music.",
        description:
          "Butta Bommalu means basket toys. Dancers hide inside huge figures made of bamboo baskets, papier-mache and cloth, then dance in processions and festivals, delighting crowds with their larger-than-life characters.",
      },
      {
        name: "Tappeta Gullu",
        location: "Srikakulam & Vizianagaram",
        summary: "A drum dance of Uttarandhra, with tappeta drums slung from the neck and bells on the ankles.",
        description:
          "Performed to invoke the village goddess Gangamma for rain, Tappeta Gullu involves groups of men beating drums tied around their necks while leaping and forming patterns. The ankle bells and drum rhythm create a thunderous, acrobatic spectacle.",
      },
      {
        name: "Dappu Dance",
        location: "Villages across Andhra Pradesh",
        summary: "Energetic procession dance driven by the resonant beat of the dappu frame drum.",
        description:
          "Dappu dancers play and dance simultaneously, their drums leading temple processions, festivals and celebrations. The dance is strongly associated with community identity and is often performed in large troupes moving through village streets.",
      },
    ]),
  },
  {
    slug: "monument",
    name: "Monument",
    singular: "Monument",
    tagline: "Stupas, temples, forts and caves across two thousand years",
    intro:
      "From the Buddhist stupa of Amaravati to the canyon fort of Gandikota, Andhra Pradesh's monuments trace dynasties, faiths and natural wonders.",
    image: "/images/cat-monument.webp",
    imageAlt: "Gandikota Fort above the red sandstone gorge of the Penna river",
    tone: "wood",
    items: withSlugs("monument", [
      {
        name: "Amaravati Stupa",
        location: "Amaravati, Palnadu District",
        summary: "Great Buddhist stupa of the Satavahana era, famed for its limestone relief sculpture.",
        description:
          "Begun around the 2nd century BCE, the Mahachaitya at Amaravati was one of the largest stupas of ancient India. Its carved limestone panels, showing the life of the Buddha, established the influential Amaravati school of sculpture.",
      },
      {
        name: "Lepakshi Temple",
        location: "Lepakshi, Sri Sathya Sai District",
        summary: "16th-century Veerabhadra temple with a famous hanging pillar and monolithic Nandi.",
        description:
          "Built under the Vijayanagara empire, the Veerabhadra temple at Lepakshi is celebrated for its carved pillars, a pillar that barely touches the ground, vast ceiling murals and one of the largest monolithic Nandi sculptures in India.",
      },
      {
        name: "Undavalli Caves",
        location: "Undavalli, Guntur District",
        summary: "Multi-storeyed rock-cut caves overlooking the Krishna river, with a reclining Vishnu.",
        description:
          "Carved into a sandstone hillside near Vijayawada, the Undavalli caves date to around the 4th to 5th century CE. The four-storey main cave houses a monolithic statue of Anantha Padmanabha reclining on the serpent Adishesha.",
      },
      {
        name: "Borra Caves",
        location: "Ananthagiri Hills, Alluri Sitharama Raju District",
        summary: "Vast limestone caves in the Eastern Ghats filled with stalactites and stalagmites.",
        description:
          "Formed by the Gosthani river flowing through limestone over millions of years, the Borra Caves reveal chambers of dramatic stalactite and stalagmite formations. They were documented in 1807 and are among the deepest caves in India.",
      },
      {
        name: "Kondaveedu Fort",
        location: "Kondaveedu, Palnadu District",
        summary: "Hill fort of the Reddy kings with ramparts winding across the Kondaveedu hills.",
        description:
          "The Reddy dynasty made Kondaveedu their capital in the 14th century, building a fort with walls, gateways, granaries and temples across the hilltops. Its ruins and trekking trails offer sweeping views of the Guntur plains.",
      },
      {
        name: "Chandragiri Fort",
        location: "Chandragiri, Tirupati District",
        summary: "Hill fort and palace complex that served as a later capital of the Vijayanagara rulers.",
        description:
          "Chandragiri Fort's Raja Mahal and Rani Mahal display Indo-Saracenic influences within a hilltop citadel. The palace now houses a museum of bronzes, weapons and artefacts, and hosts a sound and light show.",
      },
      {
        name: "Simhachalam Temple",
        location: "Simhachalam, Visakhapatnam",
        summary: "Hilltop shrine of Varaha Lakshmi Narasimha, with the deity covered in sandalwood paste.",
        description:
          "Set on the Simhachalam hill, this temple blends Kalinga and Dravidian architecture. The deity remains covered in sandalwood paste through the year and is revealed only during the Chandanotsavam festival.",
      },
      {
        name: "Srisailam Temple",
        location: "Srisailam, Nandyal District",
        summary: "Temple of Mallikarjuna Swamy and Bhramaramba Devi in the Nallamala hills.",
        description:
          "Srisailam is revered as both a Jyotirlinga and a Shakti Peetha. Its fortified temple complex, with towering gopurams and carved walls, overlooks the Krishna river in the forested Nallamala range.",
      },
      {
        name: "Gandikota Fort",
        location: "Gandikota, YSR Kadapa District",
        summary: "Fort perched above the Penna river gorge, often called the Grand Canyon of India.",
        description:
          "Gandikota's granite ramparts crown the edge of a deep red gorge cut by the Penna river. Inside the fort are temples, a mosque, granaries and a pigeon tower, framed by spectacular canyon views at sunrise and sunset.",
      },
      {
        name: "Belum Caves",
        location: "Belum, Nandyal District",
        summary: "One of the longest cave systems in the plains of the Indian subcontinent.",
        description:
          "Carved by underground water in limestone, the Belum Caves stretch over three kilometres with passages, siphons and freshwater galleries. Evidence of early human and Buddhist use has been found within the caves.",
      },
    ]),
  },
  {
    slug: "musical-instrument",
    name: "Musical Instrument",
    singular: "Musical Instrument",
    tagline: "Strings, skins, reeds and clay that carry the melody",
    intro:
      "The instruments of Andhra Pradesh accompany Carnatic concerts, temple rituals and village processions, from the Bobbili veena to the thundering dappu.",
    image: "/images/cat-instrument.webp",
    imageAlt: "A veena, mridangam and nadaswaram resting on a woven mat",
    tone: "gold",
    items: withSlugs("musical-instrument", [
      {
        name: "Chitraveena",
        location: "Carnatic concert tradition",
        summary: "A fretless lute played with a slide, producing gliding, voice-like tones.",
        description:
          "The chitraveena has main playing strings, drone strings and sympathetic strings. The player slides a cylindrical block along the strings, allowing the smooth gamakas that Carnatic music demands.",
      },
      {
        name: "Nadaswaram",
        location: "Temple and wedding music",
        summary: "A long double-reed wind instrument considered highly auspicious.",
        description:
          "Made of wood with a flared bell, the nadaswaram leads temple processions and wedding ceremonies. It is traditionally paired with the thavil drum, and its bright, powerful sound carries across festival grounds.",
      },
      {
        name: "Mridangam",
        location: "Carnatic concert tradition",
        summary: "Double-headed barrel drum that forms the rhythmic backbone of Carnatic music.",
        description:
          "Carved from a single block of jackfruit wood, the mridangam has heads of layered hide tuned with a black paste on the right side. It accompanies vocal and instrumental recitals and Kuchipudi performances.",
      },
      {
        name: "Dappu",
        location: "Villages across Andhra Pradesh",
        summary: "A frame drum of hide stretched over a wooden ring, played with sticks.",
        description:
          "The dappu is heated before playing to tighten its skin, producing a sharp, loud beat. It announces festivals, leads processions and is central to the Dappu dance.",
      },
      {
        name: "Tappeta",
        location: "Uttarandhra",
        summary: "A small drum slung from the neck, used in the Tappeta Gullu dance.",
        description:
          "The tappeta is struck with the hands or sticks as dancers leap and whirl. Its crisp rhythm, combined with ankle bells, gives Tappeta Gullu its driving energy.",
      },
      {
        name: "Tambura",
        location: "Carnatic concert tradition",
        summary: "A long-necked drone instrument that sustains the tonic for performers.",
        description:
          "The tambura has four strings plucked in a continuous cycle, creating a shimmering harmonic drone. It provides the reference pitch for singers and instrumentalists throughout a concert.",
      },
      {
        name: "Veena",
        location: "Bobbili, Vizianagaram District",
        summary: "The Saraswati veena, with Bobbili craftsmen carving instruments from a single block of wood.",
        description:
          "The veena is among the oldest Indian string instruments. Bobbili artisans carve the body and neck from one piece of jackwood, a craft recognised with a Geographical Indication tag.",
      },
      {
        name: "Ghatam",
        location: "Carnatic concert tradition",
        summary: "A clay pot percussion instrument played with fingers, palms and wrists.",
        description:
          "Made from specially fired clay with metal filings, the ghatam produces ringing tones and deep bass notes when struck on the body or mouth. It adds brilliant rhythmic texture to Carnatic ensembles.",
      },
    ]),
  },
  {
    slug: "festival",
    name: "Festival",
    singular: "Festival",
    tagline: "Harvest, devotion and celebration through the Telugu year",
    intro:
      "Festivals in Andhra Pradesh mark the seasons, honour deities and gather families, filling streets with muggulu, music and feasts.",
    image: "/images/cat-festival.webp",
    imageAlt: "Colourful muggulu rangoli with marigolds and clay pots for Sankranti",
    tone: "orange",
    items: withSlugs("festival", [
      {
        name: "Ugadi",
        location: "Across Andhra Pradesh",
        summary: "The Telugu New Year, welcomed with Ugadi pachadi and the reading of the Panchangam.",
        description:
          "Ugadi falls in the month of Chaitra. Families decorate doorways with mango leaves, prepare the six-taste Ugadi pachadi that symbolises life's experiences and gather to hear the year's forecast in the Panchanga Sravanam.",
      },
      {
        name: "Sankranti",
        location: "Across Andhra Pradesh",
        summary: "A multi-day harvest festival of muggulu, bonfires, kites and decorated bulls.",
        description:
          "Sankranti in January spans Bhogi, Sankranti and Kanuma. Homes are adorned with colourful muggulu, Haridasulu sing door to door, and Gangireddulu, decorated bulls, perform in village lanes.",
      },
      {
        name: "Dasara",
        location: "Vijayawada & across the state",
        summary: "Navaratri celebrations honouring Goddess Durga, grandest at Indrakeeladri.",
        description:
          "At the Kanaka Durga temple on Indrakeeladri hill in Vijayawada, the goddess is adorned in a different form each day of Navaratri. The festival culminates in Vijayadasami with the Teppotsavam boat procession on the Krishna.",
      },
      {
        name: "Tirumala Brahmotsavam",
        location: "Tirumala, Tirupati District",
        summary: "Nine-day annual festival of Sri Venkateswara with grand vahana processions.",
        description:
          "Each day and night of the Brahmotsavam, the utsava deity is taken around the temple streets on vahanas such as Garuda, Hanuman and the sun chariot. Hundreds of thousands of devotees gather to witness the processions.",
      },
      {
        name: "Vinayaka Chavithi",
        location: "Across Andhra Pradesh",
        summary: "Festival of Lord Ganesha with clay idols, patri puja and community pandals.",
        description:
          "Families worship Ganesha with 21 kinds of leaves in the patri puja and offer kudumulu and undrallu. Neighbourhood pandals host idols for several days before their immersion in rivers and tanks.",
      },
      {
        name: "Bathukamma-associated regional celebrations",
        location: "Telugu communities in border regions",
        summary: "Floral festivities in which women stack seasonal flowers into conical arrangements.",
        description:
          "In regional celebrations associated with Bathukamma, women arrange tiers of seasonal flowers such as tangedu and gunugu, sing folk songs in circles around them and later float them on water, honouring the goddess and the monsoon's bounty.",
      },
      {
        name: "Deccan Festival",
        location: "Deccan plateau region",
        summary: "A cultural festival celebrating Deccan music, crafts, cuisine and performance.",
        description:
          "The Deccan Festival brings together performers, artisans and cooks to showcase the shared heritage of the Deccan plateau, with Telugu music, folk arts, craft bazaars and regional food.",
      },
      {
        name: "Lepakshi Festival",
        location: "Lepakshi, Sri Sathya Sai District",
        summary: "A cultural festival staged against the backdrop of the Veerabhadra temple.",
        description:
          "The Lepakshi Festival celebrates the art and architecture of the temple town with classical and folk dance, music concerts, craft exhibitions and heritage walks around the historic temple complex.",
      },
      {
        name: "Rayalaseema Food & Cultural Festivals",
        image: "/images/items/festival/rayalaseema-food-cultural-festivals.webp",
        location: "Rayalaseema region",
        summary: "Celebrations of the hearty cuisine and folk arts of Kurnool, Kadapa, Anantapur and Chittoor.",
        description:
          "These festivals showcase Rayalaseema specialities such as ragi sangati with natukodi curry, alongside folk music, Tholu Bommalata shows and local crafts, highlighting the distinct identity of the region.",
      },
      {
        name: "Krishna Pushkaralu",
        image: "/images/items/festival/krishna-pushkaralu.webp",
        location: "Ghats along the Krishna river",
        summary: "A river festival held once every twelve years, with ritual bathing along the Krishna.",
        description:
          "Krishna Pushkaralu takes place when Jupiter enters Kanya rasi. For twelve days, pilgrims bathe at ghats in Vijayawada and other riverside towns, offering prayers to ancestors and to the river itself.",
      },
    ]),
  },
  {
    slug: "food",
    name: "Food",
    singular: "Food",
    tagline: "Fiery, tangy and generous flavours of the Andhra kitchen",
    intro:
      "Known for bold spice and tamarind tang, Andhra cuisine ranges from coastal seafood curries to temple prasadam and delicate sweets.",
    image: "/images/cat-food.webp",
    imageAlt: "Traditional Andhra meals served on a banana leaf",
    tone: "leaf",
    items: withSlugs("food", [
      {
        name: "Gongura Pachadi",
        image: "/images/items/food/gongura-pachadi.webp",
        location: "Guntur & coastal Andhra",
        summary: "A tangy, spicy relish made from sorrel leaves, often called the pride of Andhra.",
        description:
          "Gongura leaves are sauteed with red chillies, garlic and seasoning, then ground into a sharp, sour pachadi. It is eaten with hot rice and ghee and is a staple on every Andhra table.",
      },
      {
        name: "Pulihora",
        image: "/images/items/food/pulihora.webp",
        location: "Temples & homes across the state",
        summary: "Tamarind rice tempered with peanuts, curry leaves and mustard seeds.",
        description:
          "Pulihora is prepared for festivals and offered as prasadam at temples. Its tangy tamarind base, turmeric colour and crunchy tempering make it ideal for travel and celebrations.",
      },
      {
        name: "Pesarattu",
        image: "/images/items/food/pesarattu.webp",
        location: "Across Andhra Pradesh",
        summary: "A crisp green gram dosa, often served with upma inside as MLA Pesarattu.",
        description:
          "Whole green gram is soaked and ground with ginger and chillies into a batter that is spread thin on a hot griddle. Pesarattu is served with ginger chutney for a protein-rich breakfast.",
      },
      {
        name: "Pootharekulu",
        image: "/images/items/food/pootharekulu.webp",
        location: "Atreyapuram, Dr. B. R. Ambedkar Konaseema District",
        summary: "Paper-thin rice starch sheets layered with ghee, sugar or jaggery and dry fruits.",
        description:
          "Artisans spread rice batter over an inverted heated pot to make gossamer-thin wrappers, then fold them with ghee and sweeteners. Atreyapuram Pootharekulu carries a Geographical Indication tag.",
      },
      {
        name: "Bobbatlu",
        image: "/images/items/food/bobbatlu.webp",
        location: "Across Andhra Pradesh",
        summary: "Sweet flatbread stuffed with chana dal and jaggery, a festival favourite.",
        description:
          "Bobbatlu, also called bakshalu, are made by filling soft dough with a cardamom-scented chana dal and jaggery mixture and roasting them with ghee. They are essential for Ugadi and other celebrations.",
      },
      {
        name: "Andhra Meals",
        image: "/images/items/food/andhra-meals.webp",
        location: "Across Andhra Pradesh",
        summary: "A full banana-leaf spread of rice, pappu, curries, pachadi, pulusu, curd and ghee.",
        description:
          "An Andhra meal is served in a set order, beginning with rice, ghee and podi, moving through pappu, vegetable curries, pachadi and pulusu, and finishing with curd rice. Generosity and spice define the experience.",
      },
      {
        name: "Gutti Vankaya",
        image: "/images/items/food/gutti-vankaya.webp",
        location: "Across Andhra Pradesh",
        summary: "Small brinjals stuffed with a spiced peanut, sesame and coconut masala.",
        description:
          "Baby brinjals are slit and filled with a roasted masala, then slow-cooked until tender. Gutti Vankaya Kura is a celebratory dish served at weddings and festive meals.",
      },
      {
        name: "Royyala Iguru",
        image: "/images/items/food/royyala-iguru.webp",
        location: "Godavari & coastal Andhra",
        summary: "A thick, spicy prawn masala from the coastal kitchens of Andhra.",
        description:
          "Fresh prawns are cooked with onions, ginger-garlic, red chilli and garam masala until the gravy reduces and clings to each piece. It is best enjoyed with rice or chapati.",
      },
      {
        name: "Pulusu",
        image: "/images/items/food/pulusu.webp",
        location: "Across Andhra Pradesh",
        summary: "A tangy tamarind-based stew made with vegetables or fish.",
        description:
          "Pulusu ranges from sweet-sour vegetable versions to the famous chepala pulusu fish stew of the Godavari districts. Tamarind, jaggery and chilli give it a balanced, bold flavour.",
      },
      {
        name: "Ulavacharu",
        image: "/images/items/food/ulavacharu.webp",
        location: "Krishna & Guntur",
        summary: "A rich, earthy soup made from horse gram, often finished with cream.",
        description:
          "Horse gram is simmered for hours, strained and reduced with tamarind and spices into a thick, dark soup. Ulavacharu is served with rice and is valued for its warmth and nourishment.",
      },
    ]),
  },
  {
    slug: "regional-board-game",
    name: "Regional Board Game",
    singular: "Board Game",
    tagline: "Seeds, shells and chalk grids from courtyards and verandahs",
    intro:
      "Traditional games of Andhra Pradesh sharpen strategy and memory, played on carved boards, chalk grids and temple floors with seeds and cowries.",
    image: "/images/cat-board-game.webp",
    imageAlt: "Wooden Vamana Guntalu board with shells beside a chalked Ashta Chamma grid",
    tone: "coastal",
    items: withSlugs("regional-board-game", [
      {
        name: "Vamana Guntalu",
        image: "/images/items/regional-board-games/vamana-guntalu.webp",
        location: "Homes across Andhra Pradesh",
        summary: "A mancala game played on a board of fourteen pits using seeds or cowries.",
        description:
          "Two players sow seeds around two rows of seven pits, capturing counters according to set rules. Vamana Guntalu boards, often carved in wood or brass, were part of a bride's trousseau.",
      },
      {
        name: "Pallankuzhi variants",
        image: "/images/items/regional-board-games/pallankuzhi.webp",  
        location: "Southern border regions",
        summary: "Regional variations of the pit-and-seed game shared across South India.",
        description:
          "Pallankuzhi variants follow the same sowing and capturing principles as Vamana Guntalu, with local differences in the number of seeds, starting positions and capture rules.",
      },
      {
        name: "Ashta Chamma",
        image: "/images/items/regional-board-games/ashta-chamma.webp",
        location: "Homes across Andhra Pradesh",
        summary: "A race game on a five-by-five grid, played with cowrie shells as dice.",
        description:
          "Players move pawns from the outer squares toward the centre based on how many cowries land face up. Knocking out opponents and reaching the home square requires both luck and strategy.",
      },
      {
        name: "Chowka Bara variants",
        image: "/images/items/regional-board-games/chowka-bara.webp",
        location: "Rural Andhra Pradesh",
        summary: "Cross-shaped or square race games, often chalked on the floor, played with tamarind seeds.",
        description:
          "Chowka Bara variants are played on grids of different sizes with four players racing pieces to the centre. Seeds, shells or dice decide each move, and safe squares are marked with crosses.",
      },
      {
        name: "Paramapada Sopanam",
        image: "/images/items/regional-board-games/paramapada-sopanam.webp",
        location: "Homes across Andhra Pradesh",
        summary: "The ancestral snakes-and-ladders game, often played during Vaikuntha Ekadashi.",
        description:
          "Paramapada Sopanam, the ladder to salvation, uses snakes for vices and ladders for virtues. Families traditionally play through the night of Vaikuntha Ekadashi as part of the vigil.",
      },
      {
        name: "Nalugu Stambhalata",
        image: "/images/items/regional-board-games/nalugu-stambhalata.webp",
        location: "Temple mandapas & courtyards",
        summary: "The four-pillars game, in which players dash between pillars while a catcher tries to claim one.",
        description:
          "Four players stand at pillars while a fifth waits in the middle. Players swap pillars at a signal and the catcher tries to take an empty one, making this a lively game of speed and timing.",
      },
      {
        name: "traditional Mancala games",
        image: "/images/items/regional-board-games/mancala-games.webp",
        location: "Across Andhra Pradesh",
        summary: "The wider family of count-and-capture sowing games played with seeds and shells.",
        description:
          "Traditional mancala games are played on carved boards or hollows scooped into the ground. Players distribute counters pit by pit, capturing when a move ends according to local rules, building arithmetic and planning skills.",
      },
      {
        name: "Pagade variants",
        image: "/images/items/regional-board-games/pagade.webp",
        location: "Homes across Andhra Pradesh",
        summary: "Cross-shaped Pachisi-style games played with cowrie shells or long dice.",
        description:
          "Pagade is played on a cloth or board in the shape of a cross, with pawns moving around the arms toward home. Variants differ in board size, number of pawns and the dice used.",
      },
    ]),
  },
]

export const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0)

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getItem(categorySlug: string, itemSlug: string) {
  const category = getCategory(categorySlug)
  if (!category) return undefined
  const index = category.items.findIndex((i) => i.slug === itemSlug)
  if (index === -1) return undefined
  return {
    category,
    item: category.items[index],
    previous: index > 0 ? category.items[index - 1] : undefined,
    next: index < category.items.length - 1 ? category.items[index + 1] : undefined,
  }
}

export const toneClasses: Record<Tone, { bg: string; text: string; soft: string; border: string }> = {
  orange: { bg: "bg-kalamkari", text: "text-kalamkari", soft: "bg-kalamkari/10", border: "border-kalamkari/30" },
  red: { bg: "bg-kumkum", text: "text-kumkum", soft: "bg-kumkum/10", border: "border-kumkum/30" },
  gold: { bg: "bg-turmeric", text: "text-kondapalli", soft: "bg-turmeric/15", border: "border-turmeric/40" },
  wood: { bg: "bg-kondapalli", text: "text-kondapalli", soft: "bg-kondapalli/10", border: "border-kondapalli/30" },
  leaf: { bg: "bg-leaf", text: "text-leaf", soft: "bg-leaf/10", border: "border-leaf/30" },
  coastal: { bg: "bg-coastal", text: "text-coastal", soft: "bg-coastal/10", border: "border-coastal/30" },
}
