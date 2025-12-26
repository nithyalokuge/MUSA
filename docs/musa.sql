-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Dic 25, 2025 alle 13:37
-- Versione del server: 5.7.24
-- Versione PHP: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `musa`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `artifacts`
--

CREATE TABLE `artifacts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `date_info` varchar(100) DEFAULT NULL,
  `floor_number` varchar(10) DEFAULT NULL,
  `dimensions` varchar(100) DEFAULT NULL,
  `blurb` text,
  `transcript` text,
  `model_url` varchar(255) DEFAULT NULL,
  `isl_video_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type_id` int(11) DEFAULT NULL,
  `game` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `artifacts`
--

INSERT INTO `artifacts` (`id`, `title`, `author`, `date_info`, `floor_number`, `dimensions`, `blurb`, `transcript`, `model_url`, `isl_video_url`, `created_at`, `type_id`, `game`) VALUES
(1, 'Meissen Pietà', 'J. J. Kändler', '18th century AD', 'First', 'H 55 x W 29 x D 17', 'A white porcelain sculpture made in 1732 at the famous Meissen porcelain factory in Germany. The sculpture shows Mary holding the body of Jesus after he was taken down from the cross. Part of the arms of Christ and one of His feet are missing. It may have been placed in a small church or chapel for prayer.', 'This Pietà is confirmed to have been made at the famous Meissen porcelain factory around 1732. The factory was established near Dresden, Germany by Frederick-Augustus I, Elector of Saxony, in 1710 after the discovery of how to make hard-paste porcelain, a technique previously only known in Asia. Augustus had a passion for collecting porcelain and was the first European ruler to control the production of true porcelain.\r\n\r\nAlthough made at the Meissen factory in Protestant Saxony, this Pietà is an atypical  Meissen figure sculpture as it is a piece of Catholic Baroque art. Augustus and his heir both converted to Catholicism for political reasons, and records show that the palaces that Augustus had built to house his extensive porcelain collection included a chapel with some Calvary figures similar to this Pietà made for it.\r\n\r\nThe quality of the modelling in the Pietà suggests that it may be the work of J.J. Kandler, the famous Meissen modeller who trained as a sculptor under Benjamin Thomae, court sculptor at Dresden, before coming to Meissen in 1731.\r\n\r\nThe Pietà resembles Thomae\'s Apostle John, modelled for Meissen c. 1719. The sculptor depicts the Mother of God holding the limp body of Christ. Her face is upwards or \"heaven forward\", inviting religious ardour in the faithful.\r\n\r\nJohn Hunt was known to attend antiques auctions and bid on damaged and imperfect goods. Due to the damaged foot on this sculpture, Hunt purchased this Pietà for well under market value.', '1e3b55b9180a4cc0873978c4a45f7e33', 'CJ_heJ0NPxg', '2025-07-14 18:40:05', 1, NULL),
(2, 'Plat Del Dia', 'Picasso', '20th century AD', 'First', 'H 45.5 x W 29', 'A drawing in wax crayon and ink on paper. This menu card was drawn by a young Picasso for the Four Cats café in Barcelona. It shows a waiter holding food in one hand and wine in the other. It was used to show the café\'s special meal of the day. It is signed P. Ruiz Picasso, the form of his signature used by Picasso until 1901.', 'Pablo Picasso is arguably one of the most influential artists of the twentieth century, but at the time that he made this painting, P. Ruiz Picasso, as he was known by the surnames of both his parents until 1901, when he discarded Ruiz in favour of his mother\'s name alone, was still little known.\r\n\r\nThe famous Four Cats cafe, for which this sketch is a menu card, served as a popular meeting place for avant-garde artists and intellectuals in turn-of-the-century Barcelona. The bohemian environment of the restaurant provided exactly the stimulus that Picasso, then an aspiring artist, was seeking, and he staged his first one-man show in the cafe in 1900.\r\n\r\nThis menu card, designed specifically to promote the dish of the day, or Plat del Dia, the name of which would have been inserted into the large blank space below the image, is light-hearted and animated. A plump waiter, wearing a white apron and a money belt, is shown holding the dish of the day in one hand and a bottle of wine in the other.\r\n\r\nThe caricatural and stylized nature of the sketch, with its emphasized outline and exaggerated features, shows the influence of art nouveau and particularly the poster style, popular at the time and especially associated with Toulouse-Lautrec.\r\n\r\nGertrude Hunt is said to have had this hanging in her kitchen for many years, a reminder that the Hunt Collection was truly lived in, not just a sterile assortment of preserved objects kept out of reach.', '68a17ad581374915adfee31c147642a2', 'v3wtKgVAKmc', '2025-07-15 16:36:41', 2, NULL),
(3, 'Apollo - Genius of the Arts', 'Artist Unknown', '17th century AD', 'First', 'H 119', 'A wooden statue of Apollo, the Classical god of light, poetry, music, healing, and prophecy often used to represent the trades, arts, and their professions. Here he is covered in small tools, books, and instruments. These objects show the skills of music, science, and crafts. It was made in Augsburg, a German city known for its art and skilled craftsmanship.', 'This wooden statue shows Apollo, the Greek god of light, poetry, music, healing, and knowledge. It was made in Germany in the 1600s, in the city of Augsburg. Apollo was known as a protector of many trades and professions, and here he is shown with many small objects on his body that represent different kinds of work. On the lower part of his body, we see tools for crafts and manual work. On the upper part, we see things used in science and math. In the middle, we see musical instruments, like drums, a harp, a violin, a tambourine, and bagpipes. Music is important in this sculpture because Augsburg was famous for music and for making instruments.\r\n\r\nIn Apollo\'s right hand, he holds a snake and a pestle. These are symbols of medicine and healing. In his left hand, he holds a pomegranate. This fruit has many seeds inside one skin, and it shows how many different jobs can come together under one protector. The statue only has decoration on the front, which tells us it was probably placed in a corner or alcove, maybe in a guild hall. The feet are not original; they were added later.\r\n\r\nAugsburg was a very rich and important city at the time. It was full of artists, musicians, bankers, and traders. The city\'s wealth came from metalwork, banking, and book printing. The powerful families of the city, like the Fuggers and the Welsers, helped Augsburg grow. There were also many guilds in the city, groups of skilled workers who protected their jobs and made sure work was of high quality. These guilds may have paid for the statue of Apollo to show pride in their trades and to celebrate the city\'s success.\r\n\r\nThe statue also shows Apollo with a crown of laurel leaves. This is a sign of his skill in the arts, especially music. In one famous story, he wins a music contest against a creature named Marsyas, who played the flute. Apollo\'s body here is decorated in a very detailed and realistic way. This style of art was popular in Northern Europe at the time and is called \"genre art\". It often showed people at work or in everyday life. This statue fits that style, showing real tools and objects from different jobs instead of just a myth.\r\n\r\nThe Apollo statue is a beautiful example of how art, work, and pride in a city all came together in one object. Even though some of its colors are gone now, we can still see how important this figure was to the people of Augsburg.\r\n\r\nFun fact: The entire statue (except for the bird and the feet) was carved from one solid piece of wood! The sheep at his feet isn\'t part of any myth; it was probably added just to help the statue stand up straight!', '1d20261414d44f6797467851235600a0', 'vdw9Nps85Es', '2025-07-15 16:42:24', 1, NULL),
(4, 'Dekadrachm Coin', 'Artist Unknown', '5th century AD', 'Ground', 'H 4.5 x W 4 x D 0.5', 'A pendant made from a silver coin, the dekadrachm (ten-drachma) of Syracuse, set in gold. This large silver coin was made in ancient Syracuse to celebrate a military win. One side shows a chariot race, and the other shows a sea goddess with dolphins. This coin is believed by some to be one of the so-called thirty pieces of silver paid to Judas for betraying Christ. The gold band surrounding the coin is inscribed with: \"Quia precium sanguinis est\" [\"This is the price of blood\"].', 'The Hunt Museum has an entire floor of antique silver objects.\r\n\r\nThe Ancient Greek city of Syracuse was famous for making some of the best coins in history. This ten-drachma coin was special. It was made to celebrate a Syracusan victory, either against the Athenians in 413 B.C. or the Carthaginians in 405 B.C.\r\n\r\nOn the front of the coin, there is a picture of a chariot pulled by fast-running horses. A person is putting a wreath on the head of the chariot driver to show victory. In the late 5th century B.C., the design changed to make the horses look like they were moving. This design shows the power of rich people in Syracuse, because chariot racing was a sport for the rich. Gelon, the ruler of Syracuse, even won a race at the Olympic Games in 484 B.C. The armor under the chariot, a helmet, greaves (leg guards), and cuirass (body armor), shows that this was a military victory.\r\n\r\nOn the back of the coin, there is a picture of the nymph Arethusa, who was the goddess of a spring in Syracuse. She is shown with dolphins swimming around her.\r\n\r\nThe coin is in a frame, probably from the Middle Ages. The frame has a quote from the Bible: \"Quia precium sanguinis est\", which is Latin for \"Because it is the price of blood.\" People believed this coin was one of the 30 silver coins paid to Judas for betraying Jesus.\r\n\r\nThat story is not true, but the idea gave the coin religious importance. Because of this, many people took care of the coin for hundreds of years, leading to its preservation.\r\n\r\nThe story goes that this coin was once found in a bowl of old coins in a shop that sold antiques and strange items. John Hunt, who liked finding good deals, didn\'t want the shop owner to know it was valuable. So, instead of choosing just this coin, he asked to buy the whole bowl for a low price, pretending that none of the coins were special.', 'ac15d3cb770746e3998f552c55809554', 'yVJj73ceTuo', '2025-07-15 16:42:24', NULL, NULL),
(5, 'An Atlantic Drive', 'Jack B. Yeats', '20th century AD', 'First', 'H 35.5 x W 46', 'A painting, oil on canvas, entitled \"An Atlantic Drive\", by Jack B. Yeats. The painting shows four figures, the driver and three passengers on a sidecar on the Atlantic Drive, Mullaghmore, Co. Sligo. They look out over the rough sea and a stormy, misty sky.', 'Jack B. Yeats was the son of the portrait artist John Butler Yeats and the brother of the famous poet William Butler Yeats. He was born in London and studied art there. He also worked in London and Devon in the early part of his life. But Jack Yeats saw himself as a creator of a new kind of Irish art.\r\n\r\nSligo, a place where both Jack and William spent much of their youth, was very important in their work. Jack\'s early paintings, which consisted mainly of watercolors and oil paintings, had strong outlines and often used symbols. Later, his style changed. He began to paint in a more free and expressive way, using rough brushstrokes and bright, separate colors. This new style brought him international fame. In 1924, artist Walter Sickert wrote to Yeats, saying his work showed that modern painting was possible: \"Life above everything.\"\r\n\r\nIn the painting \"An Atlantic Drive\", you can see travelers in a sidecar, with the wide Atlantic Ocean behind them, painted in bold blue strokes. The scene is from Mullaghmore in County Sligo, a place Yeats often visited. This painting was first shown in Limerick at the Goodwin Galleries in March 1944, and later at a large Yeats exhibition in Dublin in 1945.\r\n\r\nDid you know that the early modern Olympic Games included art competitions? From 1912 to 1948, artists competed in five categories: architecture, literature, music, painting, and sculpture. Each work had to be inspired by sport.\r\n\r\nIn 1924, Jack B. Yeats won a silver medal in painting at the Olympics for his artwork \"The Liffey Swim\".', 'dddb6e64aaa5421f8d01cee3dc2946a3', 'BJiSYZhpA9E', '2025-07-15 16:42:24', 2, NULL),
(6, 'Dish with Crowned Woman Design', 'Artist Unknown', '13th century AD', 'First', 'Diam. 38.5', 'A dish with a portrait of a woman in earthenware. This is a large, round dish with a deep bowl. It shows a woman with a crown and strong, simple features. It was painted in green-blue color with quick brushstrokes. The dish was once placed in a wall, maybe as a shop sign.', 'This large, deep dish has a narrow base and a ring at the bottom. Inside, it shows a bold painting of a woman. She is painted with wide, quick brushstrokes. The woman wears a fancy crown, and her hair is tied back in a hairnet under it. Her eyes and eyebrows are very big and stand out. They are connected to a round border. To the right of her head, there is a flower with leaves. The edge of the dish is decorated with slanted lines. The whole design is simple but strong. Only the inside of the dish is shiny, and the painting is done in a pale green-blue colour.\r\n\r\nIn the 13th century, dishes like this were sometimes used as shop signs and placed into the walls of buildings. Some still remain today in the walls of old churches in Italy and Spain. On the back and edge of this dish, there is old lime mortar, showing that it was once set into a wall.\r\n\r\nWhen this dish was first collected, people called it the \"Picasso Dish\", even though it was made almost 700 years before Picasso was born. Can you see the similarity in the style?', '44c3720958694a85b07cad8144f8fa22', 'ztvz6IZmres', '2025-07-19 08:38:01', 3, NULL),
(7, 'Suzanne Botterell', 'William Leech', '20th century AD', 'First', 'H 134.6 x W 53.3', 'A portrait of Suzanne Botterell, aged 7, standing in front of a cherry blossom tree with flowers. The painting was commissioned by Suzanne\'s father, Percy Botterell.', 'William John Leech was born in Dublin, Ireland. His parents were Anna Louisa (née Garbois) and Professor Henry Brougham Leech. He first studied at St. Columba\'s College in Dublin, then at the Metropolitan School of Art. After that, he studied at the Royal Hibernian Academy with the artist Walter Osborne. In 1903, Leech moved to Paris to study at the Académie Julian. There, he fell in love with the French countryside and began painting in a bright, light-filled style influenced by French Impressionism.\r\n\r\nEven though he lived mostly outside Ireland, Leech stayed connected to his home country. He often showed his work with other Irish artists like Jack B. Yeats and Constance Markievicz.\r\n\r\nLeech painted the portrait \"Suzanne Botterell\" in 1920. It was ordered by Percy Dumville Botterell, a lawyer in London. His wife, May Botterell, had helped prisoners of war during World War I. One of those prisoners was Leech\'s brother, Lieutenant Colonel Cecil Leech. He introduced the two families.\r\n\r\nThe painting shows Percy and May\'s young daughter, Suzanne. The portrait is soft and gentle, with a calm feeling. Leech was very good at painting light and emotion. In the background is a cherry blossom tree, painted in a way that looks like Japanese art. Leech even signed his name in a vertical line, like in traditional Japanese painting.\r\n\r\nAfter this painting, Leech stayed close to the Botterell family. Many years later, after Percy and Leech\'s first wife (Saurin Elizabeth) had passed away, Leech and May Botterell got married in 1953. They lived together in Candy Cottage, Surrey, for the rest of their lives.', '17ae7354be534d98b52054ad19b0a1ec', 'vGuArMt_vE0', '2025-07-19 08:41:08', 2, '/hunt/games/catching'),
(8, 'A Day at the Hunt', 'Ingrid Murphy', '21st century', 'Ground', 'Unknown', 'A sculpture of the artist and her father dressed as hunters. It was made using both old ceramic techniques and modern 3D printing. A QR code on the sculpture links to a short video about their visit to the museum.', 'The modern ceramics collection is a collection of modern ceramic pieces purchased or commissioned by The Hunt Museum.\r\n\r\nIngrid Murphy is an Irish ceramic artist. She was born in Cork but has lived in the UK since 1990. She is known for mixing traditional craft with new digital technology.\r\n\r\nHer artwork, \"A Day at the Hunt\", was made for the Hunt Museum\'s Irish Contemporary Ceramics Collection. The piece is inspired by a type of old decoration called a Staffordshire flatback. These were small sculptures often placed on shelves in homes in Britain and Ireland during the 1800s.\r\n\r\nIn Murphy\'s version, the sculpture shows the artist and her father, Brendan, dressed like Victorian hunters. Their heads were 3D scanned and printed before being cast in ceramic, using both old and new methods together.\r\n\r\nWhat makes this artwork special is the QR code on it. When scanned, it links to a short video of Ingrid and her father visiting the Hunt Museum in 2016.\r\n\r\nA \"Day at the Hunt\" is shown beside both old and new museum objects. It plays with time, mixing past and future, and invites visitors to think in new ways about what we see in museums.\r\n\r\n(Disclaimer - the Day at the Hunt video that the QR code links to does not contain captions.)', NULL, 'ntiZ03s9wiU', '2025-07-19 08:43:54', 4, NULL),
(9, 'Sheela-na-gig', 'Artist Unknown', '15th century AD', 'Top', 'H 48 x W 33', 'A 15th-century sheela-na-gig stone carving from Caherelly Castle, Co. Limerick, Ireland. The carving shows a naked woman with a large vulva. It may have been used to protect buildings from evil or bad luck. This one was found by workmen in Limerick and is missing its head and feet.', 'Would you believe it if I told you that a few centuries ago, the scariest thing someone could put on their wall was a woman?\r\n\r\nA sheela na gig is a figurative carving of a naked woman displaying an exaggerated vulva. These carvings, from the Middle Ages, are architectural grotesques found throughout most of Europe on cathedrals, castles, and other buildings. The carvings may have been used to ward off death, evil, and demons. Other grotesque carvings, such as gargoyles and hunky punks, were frequently part of church decorations all over Europe. It is commonly said that their purpose was to keep evil spirits away.\r\n\r\nThe greatest concentrations of sheela na gigs can be found in Ireland, Great Britain, France, and Spain, sometimes together with male figures. Ireland has the greatest number of surviving sheela na gig carvings, with 124 reported examples in Ireland.\r\n\r\nThis 15th-century sheela-na-gig, carved in low relief, is from Caherelly Castle, Co. Limerick, Ireland. The head and part of the legs are missing, but the torso and arms are in good condition. The legs are spread apart, and there is an opening indicating the vulva. Unusually for a sheela-na-gig, the breasts and navel are well defined, and the vulva, although remarkable, is not as grotesquely exaggerated as on similar figures.\r\n\r\nThe carving was found by workmen repairing a culvert in the townland of Caherelly East, close to Lough Gur, Co. Limerick.', '611b77b9567a4de4942783ac5eeb44f6', 'Tcdbmhic2Mk', '2025-07-19 08:47:15', NULL, NULL),
(10, 'Drinking Horn', 'Artist Unknown', '15th century AD', 'First', 'Unknown', 'A drinking-horn with metal gilt mounts. The horn rests on claw feet. The rim of the horn is incised with lettering.', 'This drinking horn is like many others made in Europe between the 10th and 17th centuries. In northern Europe, from the 1400s onwards, many drinking horns had clawed feet and fancy Gothic-style decoration.\r\n\r\nThis one, found in the Hunt Museum (there are two like it!), is a good example of the \"Griffin\'s foot\" or \"Dragon\'s foot\" style. In this style, the horn stands on three claw-shaped feet. These feet were made separately and then attached to the horn with metal.\r\n\r\nThe horn itself is a real animal horn. It is decorated with silver-gilt bands that show plant-like shapes. The edge of the horn is decorated with small engraved lines and patterns, and it has an inscription that was probably added in the 1500s.\r\n\r\nIn the past, drinking horns were often given as gifts. People also used them to sign land deals or legal agreements. They were popular across northern Europe and in Ireland.\r\n\r\nFun fact: In some old stories and myths, drinking from a horn was a special tradition during big feasts or royal events. Vikings even believed that sharing a horn was a sign of trust and friendship!', 'a844c3c4cd3643f0b7c5f91e9acc00bd', 'xniOVDAdcbs', '2025-07-19 08:49:57', 3, NULL),
(11, 'Galway Chalice ', 'Artist Unknown', '17th century AD', 'Ground', 'Unknown', 'A silver cup known as the \"Galway Chalice\". This is a travelling chalice which can be taken apart into three parts: the bowl, the stem, and the foot. The bowl and stem can fit into the foot, which has an angular base and has a drawing of Christ on the cross. The chalice has the initials of a Galway silversmith, E.G.', 'This small silver cup is called a traveling chalice. It was made in the 1600s. It looks a little different from most church cups used at that time. The base has eight sides and a round top, not the usual shape. This special design made it easier to carry. A priest could take it apart and put the top part inside the bottom part. This helped when priests needed to travel in secret during hard times.\r\n\r\nThe middle part of the chalice, called the stem, has a round knob in the center. The top and bottom of the stem have different screw threads, so it can only be put together one way. On one side of the base, there is a picture of Jesus on the cross. Above him are the letters \"INRI\", and below are small letters that say \"FTD\". We do not know what \"FTD\" means, but it might be the name of the person who gave or made the chalice.\r\n\r\nOther similar chalices have been found. One is called the Elizabeth 4th Chalice and has the same kind of knob. It has a date of 1633 and came from Galway. Because of this, experts think this chalice is also from around 1630. The bottom part of the chalice also has a band with a line of small triangle shapes and dots. This style was common in Ireland at that time.\r\n\r\nThe cup part at the top is deep and smooth. There is a small mark near the top with the letters \"EG\". We think this is the maker\'s name. The same letters were found on other silver objects from Galway, so this chalice was probably made there too. We do not know exactly who \"EG\" was.\r\n\r\nFun fact: These chalices were sometimes hidden inside books or boxes so that priests could carry them without anyone seeing. Their small size helped people worship in secret.', 'f12a2d4d17c54498af6be56e66269e66', 'xZuCRDwnosk', '2025-07-19 08:56:19', 5, NULL),
(12, 'Cello Player', 'Christy Keeney\r\n', '21st century', 'Ground', 'Unknown', 'The \"Cello Player\" is a sculpture by contemporary Irish ceramicist Christy Keeney. It shows a man playing a cello in a colorful room. The face and body are flat and bold, almost like a painting. Keeney is well known for his style, which mixes drawing and sculpture in a unique way.', 'The \"Cello Player\" is another popular piece in the modern ceramics collection.\r\n\r\nChristy Keeney is a ceramic artist from Donegal, Ireland. He studied ceramics at the Royal College of Art in London and worked with well-known people like sculptor Eduardo Paolozzi and even Prince Charles. After living in London for 17 years, Keeney moved back home to Donegal, where he still lives and works today.\r\n\r\nKeeney makes ceramic sculptures of people. He is known for mixing drawing and sculpture together. He starts with flat pieces of clay and shapes them into heads and figures, then draws on them while the clay is still wet. This special way of working gives his art a very unique look.\r\n\r\nOne of his big influences was seeing a Picasso exhibition in London while he was in college. He was especially inspired by Picasso\'s small, flat sculptures made of cardboard. These helped Keeney think in new ways about his own art.\r\n\r\nThe \"Cello Player\", which is part of the Hunt\'s Contemporary Ceramics collection, clearly shows this influence. The sculpture shows a man sitting and playing the cello. The floor is black-and-white checkered, and colorful walls surround him. The man\'s face and body are shaped in a bold, unusual way that makes the sculpture almost look flat, like a painting.\r\n\r\nKeeney does not like to explain what his art means. He wants each viewer to decide for themselves. As he says, \"I prefer not to place my own descriptive explanation onto the work, but rather that spectators might derive their own meaning.\"\r\n\r\nAs you look at \"Cello Player\", ask yourself: Does it remind you of any other artworks in the museum?', '928708a0ae0a47ce98d8ea63bbc9b1af', 'TpFyIfzeYCU', '2025-07-19 08:59:16', 4, NULL),
(13, 'Elizabeth Sheridan as St Cecilia', 'Diana Jane Perry', '18th century AD', 'First&Top', 'H 163.5 x W 128', 'Elizabeth Sheridan, a celebrated singer of her time, is shown playing music with children beside her. She is dressed as Saint Cecilia, the patron saint of music. The artist, Diana Jane Perry, was a student of Sir Joshua Reynolds and painted this painting based on one of his paintings.', 'This painting, \"Elizabeth Sheridan as Saint Cecilia\", was painted by Diana Jane Perry in 1783. Miss Perry was the daughter of Edmund Sexton Pery, who was the first Earl of Limerick. She was taught how to paint by Sir Joshua Reynolds, a famous painter. He was well known for his grand style of portraiture. During her time, women were not allowed to draw or paint the human body from life. So instead of a live model, Perry copied this composition from a painting by her teacher.\r\n\r\nShown in this work is Elizabeth Ann Linley (1754-1792). She is well known for being the sitter in Thomas Gainsborough\'s famous Rococo painting entitled \"Miss Richard Brinsley Sheridan\". She was the wife of Irish-born playwright Richard Brinsley Sheridan. And while her husband is famous, she was also a professional musician in London and in Bath before she gave up her career in 1773 to marry Richard. It is said by some that she had the loveliest voice in all of Britain, though after her marriage, her husband did not permit her to perform in public. \r\n\r\nIn this painting, Elizabeth is depicted as Saint Cecilia, the patron saint of music. She is seated at a piano playing music with two child angels. The painting combines traditional elements of portraits (like the precise angles and curves of Elizabeth\'s face) and the expressions on the child angel\'s faces, along with motifs from 17th-century religious and mythological paintings (like the light coming from the clouds). This painting was made using oil paint on canvas.\r\n\r\nThis painting is the only painting in the Hunt\'s original collection known to have been painted by female artists.', 'd83707eb7e934e048426e8ac2f88930f', 'cVmeoguwzXE', '2025-07-19 09:01:20', 2, NULL),
(14, 'The Artist and His Wife', 'Robert Fagan', '19th century AD', 'First', 'H 66 x W 90', 'A painting, oil on canvas, entitled \"The Artist and his Wife\" (1803), by Robert Fagan. Fagan looks out towards the viewer and holds a pen and a book in his hand. His wife stands slightly behind him with her hand resting on his shoulder and looks towards him. She is shown à la Grecque (or topless), a style fashionable on the European continent, especially in Paris.', 'Robert Fagan was born in London in 1761. His father was an Irish baker. Even though Robert never visited Ireland, he thought of himself as Irish. He even painted a patriotic picture of a woman named Margaret Simpson as Hibernia, a symbol of Ireland.\r\n\r\nFagan studied at the Royal Academy School. After school, he traveled to Italy. He arrived in Rome in 1784 and lived there for most of his life. He became well known for painting portraits of people visiting Italy. He also worked as an art dealer and an archaeologist. In 1809, he became the Consul General of Sicily and Malta.\r\n\r\nOne of his paintings is called The Artist and His Wife. It shows Fagan with his second wife, Maria Ludovica Flajani. They got married in 1801. In the painting, Maria is shown in a style called à la grecque, which means she is topless. This was a popular style at the time, especially in Paris. It was meant to look like clothing from ancient Greece, which people admired for its ideas about democracy.\r\n\r\nIn 1815, Fagan went back to England to paint murals for a man named Lord Berwick. But the next year, when he was returning to Italy, he became sick and had money problems. Sadly, in 1816, he died by suicide.', 'ed6a0a9b2bef45d795a5de1482bcd89d', 'wi9PBANGQxc', '2025-07-19 09:03:57', 2, '/hunt/games/puzzle'),
(15, 'Night\'s Candles are Burnt Out', 'Sean Keating', '1929-1930', 'First', 'H 103 x W 127', 'A painting showing the construction of the Ardnacrusha hydroelectric power station, a symbol of Ireland\'s modern future. A group of men, including labourers, priests, engineers, and the artist himself, is gathered in the foreground. Behind them, the rising structure and machinery suggest energy and progress.', '\"Night\'s Candles are Burnt Out\" is a painting by Irish artist Seán Keating. It shows a big change happening in Ireland after the country became independent. The painting was made at the Ardnacrusha power station, which was a huge building project on the River Shannon. At the time, it was the biggest hydroelectric dam in the world, and it brought electricity to Irish homes and businesses.\r\n\r\nKeating was born near the area, in Limerick. He once said the land before the dam was like a \"medieval dungheap\", but now it was becoming modern. He thought the dam was a symbol of Ireland\'s future and progress.\r\n\r\nIn the painting, you can see many people. On the left, Keating painted himself holding a lamp to light up a skeleton. This shows Ireland\'s hard past, with war, hunger, and slow change. In the middle, a man in a suit (a businessman) stands next to a man from the IRA. This shows the fight between modern ideas and old political struggles.\r\n\r\nA priest is also in the painting, reading by candlelight. Some priests at the time did not agree with the money spent on the dam. They thought it should go to helping poor people instead. On the right, Keating paints himself again with his wife and sons. They are pointing at the dam, showing hope for a better future.\r\n\r\nWhen people first saw the painting, they didn\'t know what to think. Some said it was \"the problem painting of the year\" because it showed so many different ideas: war, peace, religion, machines, and family. But Keating found these comments funny. He had changed as an artist and now wanted to paint modern Ireland.\r\n\r\nToday, the Ardnacrusha dam still works and provides clean electricity. It was finished in 1929 and still produces about 86 megawatts of power, enough to power thousands of homes.', '32115b86f48049f69ea29988a690f1be', 'qrn4k_ekg0A', '2025-07-19 09:25:53', 2, ''),
(16, 'The Story of Our Building', 'Introductory Video', NULL, 'First', NULL, 'The Custom House, in Limerick\'s Rutland Street, has been a public building for over 250 years. This is the story of how the House was restored, adapted and fitted out to become the home of the Hunt Collection.', 'Did You Know:\r\n\r\nIn the 18th century, this building was the Customs House. It was the main office for collecting taxes and customs in Limerick.\r\n\r\nIn 1976, John and Gertrude decided to donate all of the objects to the people of Ireland.\r\n\r\nThe Irish Government declined the offer of the Collection, leading to the establishment of The Hunt Museum Trust in 1974 to hold in trust on behalf of the people of Ireland both their collection and the 16th-century Irish tower house at Craggaunowen.\r\n\r\nPlans were made to establish a museum where the collection could be shared with the public, a vision realised when the Hunt Museum opened in the historic Customs House in Limerick City in 1996.\r\n\r\nThe museum was officially inaugurated by An Taoiseach, John Bruton, on 14 February 1997. Although John and Gertrude Hunt did not live to see their dream come to life, the Hunt Museum stands as a lasting tribute to their passion, curiosity, and generosity.\r\n\r\nAfter its opening, their adopted son, John Hunt Junior, dedicated himself to running and enhancing the museum, continuing their legacy until his untimely passing in 2004.\r\n\r\nFun fact: The Hunt Museum in Limerick, Ireland, houses an impressive collection of approximately 2,500 artifacts, spanning from ancient Egypt and the Stone Age in Ireland to the 20th century.', NULL, 'ciKcn8uZwkI', '2025-07-19 12:11:36', NULL, NULL),
(17, 'The Hunts', 'Introductory Video', NULL, 'First', NULL, 'John and Gertrude Hunt were a married team of historians, collectors, and antiquarians. They dedicated their lives to collecting art and artifacts from around the world, and their collection became the foundation of the Hunt Museum in Limerick, Ireland.', 'John Durell Hunt was born on 28 May 1900 in Hertfordshire, England, to John Hunt Sr and Effie Jane Sherry.\r\n\r\nJohn\'s Irish ancestry was on his mother\'s side. His great-grandmother was born in Tuam, Co. Galway.\r\n\r\nJohn served two years of military service between 1918-1920, after which he enrolled to become a doctor at St Bartholomew\'s Hospital in London.\r\n\r\nIn 1933, John married Gertrude Hartmann, from Mannheim in Germany. They shared a love of art, history and design.\r\n\r\nDuring this time, he began buying and selling works of art.\r\n\r\nHe worked with international museums, including the Metropolitan Museum of Art in New York, and well-known antique shops and dealerships such as Christie\'s and Sotheby\'s.\r\n\r\nIn 1934, John and Gertrude opened an antique shop and gallery on Bury Street, London, where they developed an international reputation for medieval art.\r\n\r\nThroughout the 1930s, John and Gertrude travelled across Europe collecting objects from antique shops, churches, art museums, and other collectors.\r\n\r\nOver the years, they retained items to which they were particularly attached, keeping them in their home and using many on a daily basis.\r\n\r\nFun fact: There is an ancient Roman wine strainer in the museum that Gertrude Hunt used in her personal kitchen to strain pasta!\r\n\r\nTheir personal collection was both wide-ranging and diverse, and this is reflected in the variety of items forming the Hunt Collection.\r\n\r\nJohn and Gertrude moved to Ireland following the outbreak of World War II and lived initially at Lough Gur in County Limerick.\r\n\r\nJohn became a keen and informed archaeologist and worked on many excavations, including the important site at Lugh Gur.\r\n\r\nThe Hunts believed in the importance of providing opportunities for the young to experience and appreciate art and history.\r\n\r\nTheir collection, which forms the heart of this Museum, is now owned by the Hunt Museums Trust, established in 1974.', NULL, 'k70AwV5jCUw', '2025-07-19 12:12:26', NULL, NULL),
(18, 'O Dea Crozier and Mitre', 'Artist Unknown', '15th century AD', 'Ground', 'Crozier: H 34.3; Diam. (at base) 20.3\r\nMitre: H 200.8', 'The O Dea Crozier and Mitre are on display in the Museum on behalf of the Roman Catholic Diocese of Limerick. They were made to the order of Bishop Conor O Dea of Limerick in 1418 and still belong to his successor. The Crozier is shaped like a shepherd\'s staff and shows many religious figures. The Mitre is a golden hat decorated with pearls and holy words.', 'These two remarkable objects, a bishop\'s crozier and mitre, were commissioned in 1418 by Bishop Cornelius O\'Dea, the first bishop appointed to the newly formed Roman Catholic Diocese of Limerick. Together, they are among the most important surviving examples of late medieval Irish church regalia.\r\n\r\nThe crozier, measuring over 7.5 feet tall and weighing nearly 10 pounds, is both physically impressive and symbolically powerful. Traditionally carried by bishops, the crozier\'s curved shape is based on the shape of a shepherd\'s crook. This particular crozier is especially rare because it is the only known Irish example of the continental open-crook style, more common across Europe than in Ireland. Crafted from wood and decorated with silver, it features delicate chasings, crown motifs, and sculptural details that speak to the artistry of 15th-century Irish metalworkers. A Latin inscription around the base reads: \"Cornelius O\'Dea, Bishop of Limerick, caused me to be made in the year of our Lord 1418.\"\r\n\r\nThe crook itself contains a highly detailed religious tableau. At the centre is the Virgin Mary, seated beneath a dove, which is the symbol of the Holy Spirit. She is flanked by the Archangel Gabriel and a lily rising from a jug, symbols of the Annunciation, the moment Mary learns she will bear Christ. Beneath this grouping is a carving of a pelican feeding her young, a medieval symbol of sacrifice used to represent Christ\'s suffering. Further down the shaft, within finely carved canopied niches, are depictions of revered religious figures, including Saints Brigid, Catherine, Margaret, Patrick, Peter, Paul, and the Virgin Mary, as well as representations of the Trinity. The level of intricacy and devotion in these details illustrates both the spiritual purpose and the artistic sophistication of the piece.\r\n\r\nThe mitre, the ceremonial pointed hat worn by bishops, was made to accompany the crozier and is equally detailed. Constructed from silver gilt laminae, thin layers of silver covered with gold,  it is adorned with large pearls, gemstones, and ornate panels decorated with curling vine leaves and Gothic mouldings. Near the top, two Latin inscriptions are set beneath crystal: \"Hoc signum crucis erit in coelo\" (\"This sign of the cross shall appear in heaven\") and \"Cum Dominus ad judicandum venerit\" (\"When the Lord comes to judge\"). These texts would have served as powerful reminders of divine judgment and heavenly authority. At the base, an enamelled inscription identifies the maker as Thomas O\'Carrys, described as \"artifex faciens\", meaning \"the artist who made this\", linking the object to the remarkable craftsmanship flourishing in Dublin around that time.\r\n\r\nAdding to the wonder surrounding these objects is a beloved legend. According to the story, Bishop O\'Dea once arrived in Dublin for a meeting of bishops without his pontifical vestments. As he searched the city for replacements, a mysterious young man appeared from a ship and handed him a box containing a crozier and mitre. When O\'Dea turned to thank him, the youth had vanished. The bishop and many others believed the items had been divinely delivered. While we can\'t confirm the miracle, it\'s true that both the crozier and mitre are believed to have been crafted in Dublin around the same time, giving the legend a touch of historical credibility.\r\n\r\nToday, both objects are on loan from the Roman Catholic Diocese of Limerick, where they are still occasionally used during special liturgical ceremonies. They were most recently used by Bishops Butler and O\'Dwyer. Their survival and continued use reflect not just the durability of their materials, but also the enduring legacy of faith and artistry in Ireland\'s religious history.\r\n\r\nFun fact: For centuries, the crozier and mitre were kept locked in a special chest in Limerick Cathedral and brought out only for the most solemn occasions. Seeing them on display today offers a rare chance to experience the beauty, mystery, and devotional power of Ireland\'s medieval past up close.', 'e81aa36da4324065b628ef5da5599d5a', 'hSiVdghg58w', '2025-07-20 09:50:36', NULL, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `artifact_categories`
--

CREATE TABLE `artifact_categories` (
  `artifact_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `artifact_categories`
--

INSERT INTO `artifact_categories` (`artifact_id`, `category_id`) VALUES
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(5, 3),
(6, 3),
(7, 3),
(8, 4),
(9, 3),
(10, 3),
(11, 3),
(12, 4),
(13, 3),
(14, 3),
(16, 1),
(17, 2),
(18, 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `artifact_images`
--

CREATE TABLE `artifact_images` (
  `id` int(11) NOT NULL,
  `artifact_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `artifact_images`
--

INSERT INTO `artifact_images` (`id`, `artifact_id`, `image_url`) VALUES
(1, 1, '/img/artifacts/pieta1.jpg'),
(2, 1, '/img/artifacts/pieta2.jpg'),
(3, 1, '/img/artifacts/pieta3.jpg'),
(4, 1, '/img/artifacts/pieta4.jpg'),
(5, 2, '/img/artifacts/picasso1.jpg'),
(6, 2, '/img/artifacts/picasso2.jpg'),
(7, 2, '/img/artifacts/picasso3.jpg'),
(8, 3, '/img/artifacts/apollo1.jpg'),
(9, 3, '/img/artifacts/apollo2.jpg'),
(10, 3, '/img/artifacts/apollo3.jpg'),
(11, 3, '/img/artifacts/apollo4.jpg'),
(12, 3, '/img/artifacts/apollo5.jpg'),
(13, 3, '/img/artifacts/apollo6.jpg'),
(14, 4, '/img/artifacts/coin1.jpg'),
(15, 5, '/img/artifacts/atlantic1.jpg'),
(16, 5, '/img/artifacts/atlantic2.jpg'),
(17, 5, '/img/artifacts/atlantic3.jpg'),
(19, 5, '/img/artifacts/atlantic4.jpg'),
(20, 6, '/img/artifacts/dish1.jpg'),
(21, 6, '/img/artifacts/dish2.jpg'),
(25, 6, '/img/artifacts/dish3.jpeg'),
(26, 7, '/img/artifacts/littlegirl1.jpg'),
(27, 7, '/img/artifacts/littlegirl2.jpg'),
(28, 7, '/img/artifacts/littlegirl3.jpg'),
(29, 7, '/img/artifacts/littlegirl4.jpg'),
(30, 7, '/img/artifacts/littlegirl5.jpg'),
(31, 8, '/img/artifacts/hunt1.jpeg'),
(32, 8, '/img/artifacts/hunt2.jpg'),
(33, 8, '/img/artifacts/hunt3.jpeg'),
(34, 9, '/img/artifacts/sheela1.jpg'),
(35, 9, '/img/artifacts/sheela2.jpg'),
(36, 10, '/img/artifacts/drinkinghorn1.jpg'),
(37, 10, '/img/artifacts/drinkinghorn2.jpg'),
(38, 10, '/img/artifacts/drinkinghorn3.jpg'),
(39, 10, '/img/artifacts/drinkinghorn4.jpg'),
(40, 10, '/img/artifacts/drinkinghorn5.jpg'),
(41, 10, '/img/artifacts/drinkinghorn6.jpg'),
(42, 11, '/img/artifacts/galway1.jpeg'),
(43, 11, '/img/artifacts/galway2.jpg'),
(44, 12, '/img/artifacts/cello1.jpg'),
(45, 12, '/img/artifacts/cello2.jpg'),
(46, 12, '/img/artifacts/cello3.jpg'),
(47, 12, '/img/artifacts/cello4.jpg'),
(48, 12, '/img/artifacts/cello5.jpg'),
(49, 13, '/img/artifacts/elizabeth1.png'),
(50, 13, '/img/artifacts/elizabeth2.jpg'),
(51, 13, '/img/artifacts/elizabeth3.jpeg'),
(52, 13, '/img/artifacts/elizabeth4.jpeg'),
(53, 8, '/img/artifacts/hunt4.jpeg'),
(54, 10, '/img/artifacts/drinkinghorn7.jpg'),
(55, 14, '/img/artifacts/theartist1.jpg'),
(56, 14, '/img/artifacts/theartist2.jpg'),
(61, 15, '/img/artifacts/nights1.jpg'),
(62, 15, '/img/artifacts/nights2.jpg'),
(63, 15, '/img/artifacts/nights3.jpg'),
(64, 15, '/img/artifacts/nights4.jpg'),
(65, 17, '/img/artifacts/thehunts1.jpg'),
(66, 17, '/img/artifacts/thehunts2.jpg'),
(67, 16, '/img/artifacts/history1.jpeg'),
(68, 16, '/img/artifacts/history2.jpg'),
(69, 18, '/img/artifacts/crozier1.jpg'),
(70, 18, '/img/artifacts/crozier2.jpg'),
(71, 18, '/img/artifacts/crozier3.jpg'),
(72, 18, '/img/artifacts/crozier4.jpg'),
(73, 18, '/img/artifacts/crozier5.jpg'),
(74, 18, '/img/artifacts/mitre1.jpg'),
(75, 2, '/img/artifacts/picasso4.png'),
(76, 18, '/img/artifacts/mitre2.jpg'),
(77, 4, '/img/artifacts/coin2.jpg');

-- --------------------------------------------------------

--
-- Struttura della tabella `artifact_materials`
--

CREATE TABLE `artifact_materials` (
  `artifact_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `artifact_materials`
--

INSERT INTO `artifact_materials` (`artifact_id`, `material_id`) VALUES
(1, 2),
(1, 22),
(2, 21),
(3, 19),
(3, 20),
(4, 3),
(4, 4),
(4, 5),
(5, 1),
(5, 19),
(6, 2),
(6, 17),
(6, 16),
(7, 1),
(8, 2),
(9, 14),
(9, 15),
(10, 10),
(10, 11),
(10, 3),
(10, 12),
(10, 13),
(11, 3),
(11, 4),
(12, 2),
(13, 1),
(14, 1),
(15, 1),
(18, 8),
(18, 9),
(18, 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'The Story of Our Building'),
(2, 'The Hunts'),
(3, 'The Hunt'),
(4, 'Irish Contemporary Ceramics');

-- --------------------------------------------------------

--
-- Struttura della tabella `materials`
--

CREATE TABLE `materials` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `materials`
--

INSERT INTO `materials` (`id`, `name`) VALUES
(1, 'Oil on Canvas'),
(2, 'Ceramic'),
(3, 'Metal'),
(4, 'Silver'),
(5, 'Gold'),
(6, 'Glass'),
(7, 'Enamel'),
(8, 'Textile'),
(9, 'Rock crystal'),
(10, 'Animal'),
(11, 'Horn'),
(12, 'Copper alloy (gilded)'),
(13, 'Gilded'),
(14, 'Stone'),
(15, 'Limestone'),
(16, 'Pottery'),
(17, 'Earthenware'),
(18, 'Wood (gilded)'),
(19, 'Wood'),
(20, 'Lime wood (polychromed)'),
(21, 'Wax and ink on paper'),
(22, 'Porcelain');

-- --------------------------------------------------------

--
-- Struttura della tabella `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
(1, 'Sculpture'),
(2, 'Painting'),
(3, 'Containers'),
(4, 'Ceramics'),
(5, 'Ritual objects\r\n');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `artifacts`
--
ALTER TABLE `artifacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artifacts_ibfk_type` (`type_id`);

--
-- Indici per le tabelle `artifact_categories`
--
ALTER TABLE `artifact_categories`
  ADD KEY `artifact_id` (`artifact_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indici per le tabelle `artifact_images`
--
ALTER TABLE `artifact_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artifact_id` (`artifact_id`);

--
-- Indici per le tabelle `artifact_materials`
--
ALTER TABLE `artifact_materials`
  ADD KEY `artifact_id` (`artifact_id`),
  ADD KEY `material_id` (`material_id`);

--
-- Indici per le tabelle `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `artifacts`
--
ALTER TABLE `artifacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT per la tabella `artifact_images`
--
ALTER TABLE `artifact_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT per la tabella `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT per la tabella `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `artifacts`
--
ALTER TABLE `artifacts`
  ADD CONSTRAINT `artifacts_ibfk_type` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Limiti per la tabella `artifact_categories`
--
ALTER TABLE `artifact_categories`
  ADD CONSTRAINT `artifact_categories_ibfk_1` FOREIGN KEY (`artifact_id`) REFERENCES `artifacts` (`id`),
  ADD CONSTRAINT `artifact_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Limiti per la tabella `artifact_images`
--
ALTER TABLE `artifact_images`
  ADD CONSTRAINT `artifact_images_ibfk_1` FOREIGN KEY (`artifact_id`) REFERENCES `artifacts` (`id`);

--
-- Limiti per la tabella `artifact_materials`
--
ALTER TABLE `artifact_materials`
  ADD CONSTRAINT `artifact_materials_ibfk_1` FOREIGN KEY (`artifact_id`) REFERENCES `artifacts` (`id`),
  ADD CONSTRAINT `artifact_materials_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
