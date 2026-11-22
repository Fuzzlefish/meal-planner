
/*
 * UK INDICATIVE SUPERMARKET FOOD PRICE DATABASE
 *
 * Currency: GBP (£)
 * Price basis: indicative UK own-brand supermarket prices.
 * Review date: 22 November 2026.
 *
 * IMPORTANT:
 * These are estimated reference prices, not live or verified
 * prices for individual products at a particular supermarket.
 *
 * Format:
 * [product name, [aliases], unit, package size, package price]
 *
 * Units:
 * g     = grams
 * ml    = millilitres
 * piece = individual items
 *
 * Keep aliases specific. Avoid ambiguous matches such as
 * "pepper" matching both bell peppers and black pepper.
 */

const PRICE_DATABASE_UPDATED = "22 Nov 2026";

const FOOD_PRICE_DATABASE = [

  // =========================================================
  // MEAT, POULTRY & MEAT ALTERNATIVES
  // =========================================================

  ["chicken breast", ["chicken fillet", "skinless chicken breast"], "g", 700, 6.50],
  ["chicken thighs", ["boneless chicken thighs", "skinless chicken thighs"], "g", 600, 3.75],
  ["chicken drumsticks", ["chicken legs"], "g", 1000, 2.50],
  ["whole chicken", ["roasting chicken"], "g", 1500, 4.50],
  ["chicken wings", [], "g", 1000, 2.75],
  ["turkey breast", ["turkey steaks"], "g", 500, 4.00],
  ["turkey mince", ["minced turkey"], "g", 500, 3.25],
  ["turkey sausages", [], "g", 400, 2.00],
  ["beef mince", ["minced beef", "mince beef"], "g", 500, 4.50],
  ["lean beef mince", ["5 percent beef mince", "5% beef mince"], "g", 500, 5.00],
  ["stewing beef", ["diced beef", "beef chunks"], "g", 500, 5.00],
  ["beef steak", ["sirloin steak", "rump steak"], "g", 250, 4.50],
  ["beef roasting joint", ["roast beef"], "g", 1000, 9.00],
  ["beef burgers", ["hamburger patties"], "g", 454, 3.00],
  ["beef meatballs", [], "g", 360, 2.50],
  ["pork mince", ["minced pork"], "g", 500, 3.25],
  ["pork sausages", ["sausages"], "g", 454, 2.25],
  ["pork chops", [], "g", 500, 3.50],
  ["pork loin steaks", [], "g", 400, 3.50],
  ["pork shoulder", ["pork shoulder joint"], "g", 1000, 5.00],
  ["bacon", ["back bacon", "smoked bacon"], "g", 300, 2.50],
  ["gammon steaks", [], "g", 500, 3.50],
  ["ham slices", ["cooked ham"], "g", 200, 1.50],
  ["pepperoni", [], "g", 100, 1.50],
  ["chorizo", ["cooking chorizo"], "g", 200, 2.00],
  ["lamb mince", ["minced lamb"], "g", 500, 5.00],
  ["lamb chops", [], "g", 500, 6.00],
  ["diced lamb", ["lamb chunks"], "g", 500, 5.50],
  ["duck breast", [], "g", 300, 5.00],
  ["meat free mince", ["plant based mince", "vegan mince"], "g", 500, 2.50],
  ["vegetarian sausages", ["veggie sausages"], "g", 300, 2.00],
  ["vegan burgers", ["plant based burgers"], "g", 227, 2.00],
  ["tofu", ["firm tofu"], "g", 280, 1.50],
  ["tempeh", [], "g", 200, 2.50],

  // =========================================================
  // FISH & SEAFOOD
  // =========================================================

  ["salmon fillets", ["salmon", "salmon portions"], "g", 260, 5.00],
  ["smoked salmon", [], "g", 100, 3.00],
  ["cod fillets", ["cod portions"], "g", 300, 4.00],
  ["haddock fillets", [], "g", 300, 4.00],
  ["white fish fillets", ["white fish"], "g", 400, 3.00],
  ["tuna steaks", [], "g", 250, 4.00],
  ["tinned tuna", ["canned tuna", "tuna chunks"], "g", 145, 1.00],
  ["frozen prawns", ["king prawns", "raw prawns"], "g", 300, 3.50],
  ["cooked prawns", [], "g", 150, 2.00],
  ["mussels", [], "g", 500, 3.00],
  ["fish fingers", [], "g", 280, 1.75],
  ["fish cakes", [], "g", 300, 2.00],
  ["sardines", ["tinned sardines"], "g", 120, 0.75],
  ["mackerel", ["tinned mackerel"], "g", 125, 1.00],
  ["crab sticks", ["seafood sticks"], "g", 250, 1.50],

  // =========================================================
  // DAIRY, EGGS & CHEESE
  // =========================================================

  ["whole milk", [], "ml", 2000, 1.65],
  ["semi skimmed milk", ["semi-skimmed milk"], "ml", 2000, 1.55],
  ["skimmed milk", [], "ml", 2000, 1.50],
  ["oat milk", ["oat drink"], "ml", 1000, 1.20],
  ["almond milk", ["almond drink"], "ml", 1000, 1.20],
  ["soya milk", ["soy milk", "soya drink"], "ml", 1000, 1.10],
  ["lactose free milk", [], "ml", 1000, 1.50],
  ["double cream", [], "ml", 300, 1.50],
  ["single cream", [], "ml", 300, 1.20],
  ["whipping cream", [], "ml", 300, 1.50],
  ["sour cream", [], "g", 300, 1.20],
  ["creme fraiche", ["crème fraîche"], "g", 300, 1.30],
  ["natural yoghurt", ["plain yoghurt", "plain yogurt"], "g", 500, 1.20],
  ["greek yoghurt", ["greek yogurt"], "g", 500, 1.60],
  ["vanilla yoghurt", ["vanilla yogurt"], "g", 500, 1.30],
  ["strawberry yoghurt", ["strawberry yogurt"], "g", 500, 1.30],
  ["butter", [], "g", 250, 2.10],
  ["salted butter", [], "g", 250, 2.10],
  ["unsalted butter", [], "g", 250, 2.10],
  ["spreadable butter", ["buttery spread"], "g", 500, 2.00],
  ["margarine", ["vegetable spread"], "g", 500, 1.50],
  ["cheddar cheese", ["mature cheddar"], "g", 400, 3.25],
  ["red leicester cheese", [], "g", 200, 2.00],
  ["mozzarella", ["mozzarella cheese"], "g", 125, 0.80],
  ["parmesan", ["grated parmesan", "parmesan cheese"], "g", 150, 2.00],
  ["feta cheese", ["feta"], "g", 200, 1.50],
  ["cream cheese", [], "g", 200, 1.30],
  ["cottage cheese", [], "g", 300, 1.20],
  ["ricotta", ["ricotta cheese"], "g", 250, 1.50],
  ["halloumi", ["halloumi cheese"], "g", 225, 2.00],
  ["goats cheese", ["goat cheese"], "g", 150, 2.00],
  ["blue cheese", [], "g", 150, 2.00],
  ["eggs", ["free range eggs", "large eggs"], "piece", 12, 2.50],

  // =========================================================
  // FRESH VEGETABLES & SALAD
  // =========================================================

  ["white potatoes", ["potatoes", "potato"], "g", 2500, 1.75],
  ["sweet potatoes", ["sweet potato"], "g", 1000, 1.50],
  ["red onions", ["red onion"], "g", 500, 0.90],
  ["brown onions", ["onions", "white onions", "onion"], "g", 1000, 1.00],
  ["spring onions", [], "piece", 1, 0.65],
  ["shallots", [], "g", 300, 1.20],
  ["garlic", ["garlic bulb"], "piece", 1, 0.40],
  ["ginger", ["fresh ginger"], "g", 100, 0.60],
  ["carrots", ["carrot"], "g", 1000, 0.75],
  ["parsnips", ["parsnip"], "g", 500, 0.90],
  ["broccoli", ["broccoli head"], "piece", 1, 0.80],
  ["cauliflower", [], "piece", 1, 1.00],
  ["green cabbage", ["cabbage"], "piece", 1, 0.90],
  ["red cabbage", [], "piece", 1, 1.20],
  ["kale", [], "g", 200, 1.00],
  ["spinach", ["fresh spinach"], "g", 200, 1.00],
  ["lettuce", ["iceberg lettuce"], "piece", 1, 0.75],
  ["rocket", ["rocket leaves"], "g", 60, 0.90],
  ["mixed salad leaves", ["salad leaves"], "g", 150, 1.00],
  ["cucumber", [], "piece", 1, 0.75],
  ["courgette", ["zucchini"], "piece", 1, 0.65],
  ["aubergine", ["eggplant"], "piece", 1, 0.90],
  ["red bell peppers", ["red pepper"], "piece", 1, 0.60],
  ["green bell peppers", ["green pepper"], "piece", 1, 0.60],
  ["yellow bell peppers", ["yellow pepper"], "piece", 1, 0.60],
  ["mixed bell peppers", ["mixed peppers"], "piece", 3, 1.50],
  ["fresh tomatoes", ["tomatoes", "tomato"], "g", 500, 1.20],
  ["cherry tomatoes", [], "g", 250, 1.00],
  ["plum tomatoes", [], "g", 400, 1.00],
  ["mushrooms", ["closed cup mushrooms"], "g", 300, 1.00],
  ["chestnut mushrooms", [], "g", 250, 1.20],
  ["portobello mushrooms", [], "g", 250, 1.50],
  ["leeks", ["leek"], "piece", 1, 0.65],
  ["celery", ["celery sticks"], "piece", 1, 0.75],
  ["sweetcorn", ["corn", "corn on the cob kernels"], "g", 300, 0.80],
  ["corn on the cob", [], "piece", 2, 1.00],
  ["green beans", [], "g", 220, 1.00],
  ["mangetout", [], "g", 150, 1.20],
  ["asparagus", [], "g", 200, 2.00],
  ["brussels sprouts", ["sprouts"], "g", 500, 1.00],
  ["butternut squash", [], "piece", 1, 1.30],
  ["pumpkin", [], "g", 1000, 1.50],
  ["radishes", [], "g", 200, 0.70],
  ["beetroot", [], "g", 250, 0.80],
  ["fresh chillies", ["red chilli", "green chilli"], "g", 50, 0.70],
  ["jalapenos", ["fresh jalapeno"], "g", 100, 0.90],
  ["fresh parsley", ["parsley"], "g", 30, 0.65],
  ["fresh coriander", ["coriander leaves", "cilantro"], "g", 30, 0.65],
  ["fresh basil", ["basil leaves"], "g", 30, 0.70],
  ["fresh mint", ["mint leaves"], "g", 30, 0.65],
  ["fresh rosemary", ["rosemary"], "g", 20, 0.65],
  ["fresh thyme", ["thyme"], "g", 20, 0.65],

  // =========================================================
  // FRESH FRUIT
  // =========================================================

  ["bananas", ["banana"], "piece", 5, 0.90],
  ["apples", ["apple"], "piece", 6, 1.50],
  ["oranges", ["orange"], "piece", 5, 1.50],
  ["lemons", ["lemon"], "piece", 4, 1.20],
  ["limes", ["lime"], "piece", 4, 1.20],
  ["strawberries", [], "g", 400, 2.00],
  ["blueberries", [], "g", 150, 1.50],
  ["raspberries", [], "g", 150, 2.00],
  ["blackberries", [], "g", 150, 1.80],
  ["grapes", ["seedless grapes"], "g", 500, 1.80],
  ["watermelon", [], "g", 1000, 2.00],
  ["melon", ["honeydew melon", "galia melon"], "piece", 1, 1.50],
  ["pineapple", [], "piece", 1, 1.50],
  ["mango", ["mangoes"], "piece", 1, 0.90],
  ["kiwi fruit", ["kiwi"], "piece", 6, 1.50],
  ["pears", ["pear"], "piece", 4, 1.20],
  ["peaches", ["peach"], "piece", 4, 1.80],
  ["nectarines", ["nectarine"], "piece", 4, 1.80],
  ["plums", ["plum"], "g", 500, 1.50],
  ["avocado", ["avocados"], "piece", 2, 1.50],
  ["fresh dates", [], "g", 200, 1.50],
  ["pomegranate", [], "piece", 1, 1.50],
  ["clementines", ["easy peelers"], "g", 600, 1.50],
  ["grapefruit", [], "piece", 1, 0.70],

  // =========================================================
  // FROZEN FRUIT & VEGETABLES
  // =========================================================

  ["frozen peas", ["peas"], "g", 900, 1.20],
  ["frozen sweetcorn", [], "g", 900, 1.20],
  ["frozen broccoli", [], "g", 900, 1.50],
  ["frozen spinach", [], "g", 900, 1.50],
  ["frozen mixed vegetables", ["mixed veg"], "g", 1000, 1.20],
  ["frozen green beans", [], "g", 900, 1.30],
  ["frozen cauliflower", [], "g", 900, 1.30],
  ["frozen peppers", ["frozen sliced peppers"], "g", 500, 1.50],
  ["frozen berries", ["mixed frozen berries"], "g", 500, 2.00],
  ["frozen strawberries", [], "g", 500, 1.80],
  ["frozen mango", ["frozen mango chunks"], "g", 500, 2.00],
  ["frozen chips", ["oven chips"], "g", 1000, 1.50],
  ["frozen potato wedges", ["wedges"], "g", 750, 1.50],
  ["frozen roast potatoes", [], "g", 750, 1.50],
  ["frozen onion", ["frozen diced onion"], "g", 500, 1.00],

  // =========================================================
  // BREAD, BAKERY & WRAPS
  // =========================================================

  ["white bread", ["white loaf"], "piece", 1, 1.20],
  ["wholemeal bread", ["brown bread", "wholemeal loaf"], "piece", 1, 1.30],
  ["sourdough bread", ["sourdough loaf"], "piece", 1, 2.00],
  ["seeded bread", ["seeded loaf"], "piece", 1, 1.50],
  ["bagels", ["plain bagels"], "piece", 5, 1.25],
  ["burger buns", ["burger rolls"], "piece", 4, 1.00],
  ["hot dog rolls", [], "piece", 6, 1.00],
  ["tortilla wraps", ["wraps", "flour tortillas"], "piece", 8, 1.20],
  ["wholemeal wraps", [], "piece", 6, 1.30],
  ["pitta bread", ["pitta"], "piece", 6, 1.00],
  ["naan bread", ["naan"], "piece", 2, 1.00],
  ["garlic bread", [], "piece", 1, 1.20],
  ["crumpets", [], "piece", 6, 0.90],
  ["english muffins", ["muffins"], "piece", 4, 1.00],
  ["croissants", [], "piece", 4, 1.50],
  ["puff pastry", [], "g", 320, 1.20],
  ["shortcrust pastry", [], "g", 320, 1.20],
  ["pizza bases", [], "piece", 2, 1.50],
  ["breadcrumbs", ["dried breadcrumbs"], "g", 175, 0.80],

  // =========================================================
  // RICE, PASTA, NOODLES & GRAINS
  // =========================================================

  ["pasta", ["dried pasta"], "g", 500, 0.95],
  ["spaghetti", [], "g", 500, 0.95],
  ["penne pasta", ["penne"], "g", 500, 0.95],
  ["fusilli pasta", ["fusilli"], "g", 500, 0.95],
  ["macaroni", ["macaroni pasta"], "g", 500, 0.95],
  ["lasagne sheets", ["lasagne pasta"], "g", 500, 1.20],
  ["fresh pasta", [], "g", 300, 1.50],
  ["egg noodles", [], "g", 300, 1.20],
  ["rice noodles", [], "g", 200, 1.20],
  ["instant noodles", [], "g", 85, 0.50],
  ["white rice", ["long grain rice"], "g", 1000, 1.80],
  ["basmati rice", [], "g", 1000, 2.00],
  ["brown rice", [], "g", 1000, 2.00],
  ["jasmine rice", [], "g", 1000, 2.50],
  ["risotto rice", ["arborio rice"], "g", 500, 1.50],
  ["microwave rice", [], "g", 250, 0.80],
  ["couscous", [], "g", 500, 1.20],
  ["quinoa", [], "g", 300, 1.80],
  ["bulgur wheat", ["bulgur"], "g", 500, 1.20],
  ["pearl barley", [], "g", 500, 1.00],
  ["oats", ["porridge oats", "rolled oats"], "g", 1000, 1.50],
  ["granola", [], "g", 500, 2.00],
  ["muesli", [], "g", 750, 2.00],

  // =========================================================
  // TINNED, JARRED & PULSES
  // =========================================================

  ["chopped tomatoes", ["tinned tomatoes", "canned chopped tomatoes"], "g", 400, 0.55],
  ["passata", ["tomato passata"], "g", 500, 0.75],
  ["tomato puree", ["tomato paste"], "g", 200, 0.65],
  ["baked beans", [], "g", 415, 0.50],
  ["kidney beans", [], "g", 400, 0.65],
  ["black beans", [], "g", 400, 0.75],
  ["cannellini beans", [], "g", 400, 0.70],
  ["butter beans", [], "g", 400, 0.70],
  ["chickpeas", [], "g", 400, 0.65],
  ["lentils", ["tinned lentils"], "g", 400, 0.75],
  ["red lentils", ["dried red lentils"], "g", 500, 1.20],
  ["green lentils", ["dried green lentils"], "g", 500, 1.50],
  ["split peas", [], "g", 500, 1.00],
  ["coconut milk", [], "ml", 400, 0.95],
  ["cream of mushroom soup", [], "g", 400, 0.75],
  ["cream of chicken soup", [], "g", 400, 0.75],
  ["vegetable soup", [], "g", 400, 0.75],
  ["chicken soup", [], "g", 400, 0.75],
  ["sweetcorn tin", ["tinned sweetcorn"], "g", 300, 0.65],
  ["tinned peas", [], "g", 300, 0.60],
  ["tinned carrots", [], "g", 300, 0.60],
  ["tinned pineapple", [], "g", 400, 0.90],
  ["tinned peaches", [], "g", 400, 0.90],
  ["tinned fruit cocktail", [], "g", 400, 0.90],
  ["jam", [], "g", 454, 1.20],
  ["peanut butter", [], "g", 340, 1.50],
  ["honey", [], "g", 340, 1.80],
  ["maple syrup", [], "ml", 250, 2.50],
  ["golden syrup", [], "g", 680, 1.80],

  // =========================================================
  // COOKING OILS, VINEGARS & FATS
  // =========================================================

  ["olive oil", ["extra virgin olive oil"], "ml", 500, 4.50],
  ["vegetable oil", [], "ml", 1000, 1.80],
  ["sunflower oil", [], "ml", 1000, 2.00],
  ["rapeseed oil", [], "ml", 500, 2.00],
  ["sesame oil", [], "ml", 250, 2.00],
  ["coconut oil", [], "g", 500, 3.00],
  ["balsamic vinegar", [], "ml", 250, 1.80],
  ["white wine vinegar", [], "ml", 500, 1.00],
  ["red wine vinegar", [], "ml", 500, 1.00],
  ["apple cider vinegar", ["cider vinegar"], "ml", 500, 1.50],
  ["malt vinegar", [], "ml", 568, 0.70],

  // =========================================================
  // HERBS, SPICES & SEASONINGS
  // =========================================================

  ["salt", ["table salt"], "g", 750, 0.50],
  ["sea salt", [], "g", 250, 1.00],
  ["black pepper", ["ground black pepper"], "g", 50, 1.00],
  ["white pepper", [], "g", 50, 1.00],
  ["paprika", ["ground paprika"], "g", 45, 0.90],
  ["smoked paprika", [], "g", 45, 1.00],
  ["chilli powder", [], "g", 45, 0.90],
  ["cayenne pepper", [], "g", 45, 0.90],
  ["cumin", ["ground cumin"], "g", 45, 0.90],
  ["coriander powder", ["ground coriander"], "g", 45, 0.90],
  ["turmeric", ["ground turmeric"], "g", 45, 0.90],
  ["curry powder", [], "g", 100, 1.00],
  ["garam masala", [], "g", 45, 0.90],
  ["cinnamon", ["ground cinnamon"], "g", 45, 0.90],
  ["nutmeg", ["ground nutmeg"], "g", 45, 1.00],
  ["mixed herbs", [], "g", 18, 0.80],
  ["dried oregano", ["oregano"], "g", 15, 0.80],
  ["dried basil", ["basil"], "g", 15, 0.80],
  ["dried thyme", ["thyme"], "g", 15, 0.80],
  ["dried rosemary", ["rosemary"], "g", 15, 0.80],
  ["bay leaves", [], "g", 5, 0.80],
  ["dried parsley", [], "g", 15, 0.80],
  ["dried mint", [], "g", 15, 0.80],
  ["chilli flakes", [], "g", 35, 1.00],
  ["garlic granules", [], "g", 50, 0.90],
  ["onion powder", [], "g", 50, 0.90],
  ["mustard powder", [], "g", 50, 1.00],
  ["ground ginger", [], "g", 45, 0.90],
  ["mixed spice", [], "g", 45, 0.90],
  ["five spice", ["chinese five spice"], "g", 45, 1.00],
  ["vanilla extract", [], "ml", 38, 1.50],

  // =========================================================
  // SAUCES, CONDIMENTS & PASTES
  // =========================================================

  ["tomato ketchup", ["ketchup"], "ml", 460, 1.20],
  ["mayonnaise", ["mayo"], "ml", 500, 1.50],
  ["light mayonnaise", [], "ml", 500, 1.50],
  ["brown sauce", [], "ml", 465, 1.20],
  ["barbecue sauce", ["bbq sauce"], "ml", 500, 1.50],
  ["sweet chilli sauce", [], "ml", 300, 1.20],
  ["soy sauce", ["soya sauce"], "ml", 150, 0.90],
  ["dark soy sauce", [], "ml", 150, 1.00],
  ["teriyaki sauce", [], "ml", 250, 1.50],
  ["worcestershire sauce", [], "ml", 150, 1.20],
  ["hot sauce", [], "ml", 150, 1.20],
  ["sriracha", [], "ml", 200, 1.80],
  ["mustard", ["english mustard"], "g", 170, 0.90],
  ["wholegrain mustard", [], "g", 170, 1.20],
  ["dijon mustard", [], "g", 170, 1.30],
  ["pesto", ["basil pesto"], "g", 190, 1.50],
  ["red pesto", [], "g", 190, 1.50],
  ["mayonnaise dressing", [], "ml", 250, 1.20],
  ["tahini", [], "g", 300, 2.50],
  ["hummus", [], "g", 200, 1.00],
  ["curry paste", [], "g", 200, 1.50],
  ["thai red curry paste", [], "g", 200, 1.50],
  ["thai green curry paste", [], "g", 200, 1.50],
  ["harissa paste", [], "g", 100, 1.20],
  ["miso paste", [], "g", 150, 1.80],
  ["stock cubes", ["vegetable stock cubes"], "piece", 10, 0.70],
  ["chicken stock cubes", [], "piece", 10, 0.70],
  ["beef stock cubes", [], "piece", 10, 0.70],
  ["vegetable stock pot", [], "piece", 4, 1.50],
  ["gravy granules", [], "g", 170, 1.00],
  ["mint sauce", [], "g", 165, 0.90],
  ["apple sauce", [], "g", 200, 0.90],
  ["cranberry sauce", [], "g", 200, 1.00],

  // =========================================================
  // BAKING INGREDIENTS
  // =========================================================

  ["plain flour", ["all purpose flour"], "g", 1500, 0.90],
  ["self raising flour", ["self-raising flour"], "g", 1500, 0.95],
  ["strong bread flour", ["bread flour"], "g", 1500, 1.20],
  ["wholemeal flour", [], "g", 1500, 1.30],
  ["cornflour", ["corn starch", "cornstarch"], "g", 250, 0.80],
  ["baking powder", [], "g", 170, 0.80],
  ["bicarbonate of soda", ["baking soda"], "g", 200, 0.80],
  ["dried yeast", [], "g", 7, 0.20],
  ["caster sugar", [], "g", 1000, 1.20],
  ["granulated sugar", [], "g", 1000, 0.95],
  ["brown sugar", ["light brown sugar"], "g", 500, 1.20],
  ["dark brown sugar", [], "g", 500, 1.30],
  ["icing sugar", [], "g", 500, 1.00],
  ["demerara sugar", [], "g", 500, 1.20],
  ["cocoa powder", [], "g", 250, 2.00],
  ["dark chocolate", [], "g", 100, 1.00],
  ["milk chocolate", [], "g", 100, 1.00],
  ["white chocolate", [], "g", 100, 1.20],
  ["chocolate chips", [], "g", 100, 1.20],
  ["desiccated coconut", [], "g", 200, 1.00],
  ["ground almonds", [], "g", 200, 2.00],
  ["almond flakes", [], "g", 100, 1.50],
  ["raisins", [], "g", 500, 1.50],
  ["sultanas", [], "g", 500, 1.50],
  ["dried cranberries", [], "g", 200, 1.50],
  ["mixed dried fruit", [], "g", 500, 1.80],
  ["chopped nuts", [], "g", 200, 2.00],
  ["walnuts", [], "g", 200, 2.00],
  ["almonds", [], "g", 200, 2.00],
  ["cashews", [], "g", 200, 2.00],
  ["pecans", [], "g", 100, 2.00],
  ["hazelnuts", [], "g", 200, 2.00],
  ["pistachios", [], "g", 100, 2.00],
  ["desiccated coconut", [], "g", 200, 1.00],

  // =========================================================
  // NUTS, SEEDS & SNACKING
  // =========================================================

  ["peanuts", [], "g", 200, 1.00],
  ["pumpkin seeds", [], "g", 200, 1.50],
  ["sunflower seeds", [], "g", 200, 1.20],
  ["chia seeds", [], "g", 200, 1.80],
  ["flaxseed", ["linseed"], "g", 200, 1.20],
  ["sesame seeds", [], "g", 100, 1.00],
  ["popcorn kernels", [], "g", 500, 1.20],
  ["crisps", ["potato crisps"], "g", 150, 1.00],
  ["tortilla chips", ["nachos"], "g", 200, 1.00],
  ["pretzels", [], "g", 200, 1.00],
  ["rice cakes", [], "g", 130, 0.80],
  ["crackers", [], "g", 200, 1.00],
  ["digestive biscuits", [], "g", 400, 1.00],
  ["oat biscuits", [], "g", 300, 1.20],
  ["dark chocolate biscuits", [], "g", 200, 1.20],
  ["cereal bars", ["snack bars"], "piece", 6, 1.50],
  ["protein bars", [], "piece", 3, 2.50],

  // =========================================================
  // BREAKFAST & CEREALS
  // =========================================================

  ["cornflakes", [], "g", 500, 1.50],
  ["bran flakes", [], "g", 500, 1.80],
  ["shredded wheat", [], "g", 500, 2.00],
  ["rice krispies", [], "g", 340, 1.80],
  ["weetabix", [], "g", 430, 2.50],
  ["porridge sachets", ["instant porridge"], "piece", 10, 1.80],
  ["pancake mix", [], "g", 300, 1.00],
  ["waffles", [], "g", 250, 1.50],

  // =========================================================
  // DRINKS
  // =========================================================

  ["orange juice", [], "ml", 1000, 1.20],
  ["apple juice", [], "ml", 1000, 1.20],
  ["cloudy apple juice", [], "ml", 1000, 1.40],
  ["cranberry juice", [], "ml", 1000, 1.50],
  ["pineapple juice", [], "ml", 1000, 1.50],
  ["squash", ["fruit squash"], "ml", 1000, 1.20],
  ["cola", ["coca cola style drink"], "ml", 2000, 1.50],
  ["lemonade", [], "ml", 2000, 1.20],
  ["sparkling water", [], "ml", 2000, 0.70],
  ["still water", [], "ml", 2000, 0.60],
  ["tea bags", ["tea"], "piece", 80, 1.50],
  ["ground coffee", [], "g", 200, 2.50],
  ["instant coffee", [], "g", 100, 2.00],
  ["hot chocolate powder", [], "g", 250, 2.00],

  // =========================================================
  // FROZEN MEALS & CONVENIENCE FOOD
  // =========================================================

  ["frozen pizza", [], "piece", 1, 1.50],
  ["frozen lasagne", [], "g", 400, 2.00],
  ["frozen chicken nuggets", [], "g", 500, 2.00],
  ["frozen chicken burgers", [], "g", 400, 2.00],
  ["frozen fish pie", [], "g", 400, 2.50],
  ["frozen battered fish", [], "g", 400, 2.50],
  ["frozen sausage rolls", [], "g", 400, 2.00],
  ["frozen spring rolls", [], "g", 400, 2.00],
  ["frozen garlic mushrooms", [], "g", 300, 2.00],

].map(([name, aliases, unit, packageSize, packagePrice]) => ({
  name,
  aliases,
  unit,
  packageSize,
  packagePrice
}));
