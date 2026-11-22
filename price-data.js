
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
  ["pizza", ["pizzas", "frozen pizza", "frozen pizzas"], "each", 1, 2.50],


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


/*
 * =========================================================
 * EXTENDED FOOD NAME DATABASE
 *
 * Adds alternative ingredient names to the existing UK
 * supermarket price database.
 *
 * Does not change prices, package sizes or product units.
 * =========================================================
 */

const EXTRA_FOOD_ALIASES = {

  // =========================================================
  // MEAT & POULTRY
  // =========================================================

  "chicken breast": [
    "chicken breasts", "chicken breast fillets", "chicken fillets",
    "chicken breast pieces", "chicken strips", "chicken chunks",
    "diced chicken breast", "cubed chicken", "chicken mini fillets",
    "boneless chicken breast", "skinless chicken fillets",
    "raw chicken breast", "fresh chicken breast", "chicken meat",
    "chicken portions", "chicken breast meat"
  ],

  "chicken thighs": [
    "chicken thigh", "chicken thigh fillets", "chicken thigh pieces",
    "diced chicken thighs", "boneless thigh fillets",
    "boneless skinless thighs", "skinless thigh fillets",
    "chicken thigh meat", "chicken thigh portions"
  ],

  "chicken drumsticks": [
    "chicken drumstick", "chicken legs", "chicken leg portions",
    "drumsticks", "chicken lower legs"
  ],

  "whole chicken": [
    "whole roasting chicken", "roast chicken", "roasting bird",
    "medium chicken", "large chicken", "whole bird"
  ],

  "chicken wings": [
    "chicken wing", "chicken wing portions", "chicken wing pieces",
    "chicken wings portions"
  ],

  "turkey breast": [
    "turkey breast fillet", "turkey breast steaks", "turkey fillet",
    "turkey escalopes", "turkey strips", "diced turkey",
    "turkey chunks", "turkey breast pieces"
  ],

  "turkey mince": [
    "turkey ground meat", "ground turkey", "minced turkey meat"
  ],

  "beef mince": [
    "beef ground meat", "ground beef", "minced beef",
    "regular beef mince", "standard beef mince",
    "beef mince meat", "mince", "minced meat",
    "beef mince 20 percent", "20% beef mince"
  ],

  "lean beef mince": [
    "lean minced beef", "lean ground beef", "low fat beef mince",
    "extra lean mince", "extra lean beef mince",
    "5 percent fat mince", "5% fat mince", "lean mince",
    "reduced fat beef mince"
  ],

  "stewing beef": [
    "beef for stew", "beef stew meat", "diced stewing steak",
    "braising steak", "beef casserole pieces", "casserole beef",
    "beef cubes", "stew beef"
  ],

  "beef steak": [
    "steak", "steaks", "beef steaks", "rump", "sirloin",
    "fillet steak", "ribeye steak", "rib eye steak",
    "minute steak", "steak pieces"
  ],

  "beef burgers": [
    "beef burger", "burgers", "burger patties", "burger patty",
    "hamburgers", "hamburger", "beef patties"
  ],

  "beef meatballs": [
    "meatballs", "beef balls", "minced beef meatballs",
    "italian meatballs"
  ],

  "pork mince": [
    "ground pork", "minced pork meat", "pork ground meat"
  ],

  "pork sausages": [
    "pork sausage", "sausage", "sausages", "bangers",
    "british sausages", "cumberland sausages", "pork links"
  ],

  "pork chops": [
    "pork chop", "pork loin chops", "bone in pork chops",
    "boneless pork chops", "pork steaks"
  ],

  "pork loin steaks": [
    "pork loin steak", "pork loin", "pork medallions",
    "pork loin medallions", "pork escalopes"
  ],

  "pork shoulder": [
    "pork shoulder joint", "shoulder of pork", "pulled pork joint",
    "pork roasting shoulder", "pork shoulder meat"
  ],

  "bacon": [
    "bacon rashers", "rashers", "streaky bacon", "smoked rashers",
    "unsmoked bacon", "smoked back bacon", "bacon strips",
    "bacon pieces", "bacon lardons"
  ],

  "ham slices": [
    "ham", "ham slice", "sandwich ham", "deli ham",
    "cooked ham slices", "wafer thin ham", "ham steaks"
  ],

  "lamb mince": [
    "ground lamb", "minced lamb meat", "lamb ground meat"
  ],

  "lamb chops": [
    "lamb chop", "lamb cutlets", "lamb loin chops",
    "lamb cutlet"
  ],

  "diced lamb": [
    "lamb cubes", "lamb chunks", "lamb stew meat",
    "lamb casserole pieces", "lamb for curry"
  ],

  "meat free mince": [
    "veggie mince", "vegetarian mince", "plant mince",
    "meatless mince", "soy mince", "soya mince",
    "quorn mince", "meat alternative mince"
  ],

  "vegetarian sausages": [
    "veggie sausage", "veggie sausages", "meat free sausages",
    "meatless sausages", "plant based sausages",
    "vegetable sausages", "quorn sausages"
  ],

  "tofu": [
    "tofu blocks", "tofu block", "bean curd",
    "soya bean curd", "soybean curd", "extra firm tofu",
    "silken tofu", "pressed tofu"
  ],

  // =========================================================
  // FISH & SEAFOOD
  // =========================================================

  "salmon fillets": [
    "salmon fillet", "fresh salmon", "salmon portions",
    "salmon portion", "salmon steaks", "salmon steak",
    "skinless salmon", "boneless salmon", "salmon pieces",
    "salmon side", "raw salmon"
  ],

  "smoked salmon": [
    "smoked salmon slices", "smoked salmon pieces",
    "smoked salmon trimmings", "salmon smoked"
  ],

  "cod fillets": [
    "cod fillet", "fresh cod", "cod portions", "cod loin",
    "cod pieces", "skinless cod", "cod steaks"
  ],

  "haddock fillets": [
    "haddock fillet", "fresh haddock", "haddock portions",
    "smoked haddock"
  ],

  "white fish fillets": [
    "white fish", "white fish portions", "white fish pieces",
    "frozen white fish", "fish fillets", "fish portions"
  ],

  "tinned tuna": [
    "tuna tin", "tuna tins", "canned tuna", "tin tuna",
    "tuna in spring water", "tuna in brine", "tuna in oil",
    "tuna chunks", "tuna flakes"
  ],

  "frozen prawns": [
    "prawn", "prawns", "raw prawns", "uncooked prawns",
    "frozen king prawns", "prawn meat", "shrimp",
    "frozen shrimp", "raw king prawns"
  ],

  "cooked prawns": [
    "cooked prawn", "ready cooked prawns", "ready to eat prawns",
    "peeled cooked prawns", "salad prawns"
  ],

  "fish fingers": [
    "fish finger", "breaded fish fingers", "frozen fish fingers"
  ],

  "sardines": [
    "sardine", "sardines in tomato sauce", "tinned sardines",
    "canned sardines"
  ],

  "mackerel": [
    "mackerel fillets", "smoked mackerel", "tinned mackerel",
    "canned mackerel"
  ],

  // =========================================================
  // MILK, CREAM & DAIRY
  // =========================================================

  "whole milk": [
    "full fat milk", "full-fat milk", "full cream milk",
    "blue milk", "whole cows milk", "whole cow's milk",
    "cow milk", "fresh whole milk"
  ],

  "semi skimmed milk": [
    "semi skim milk", "semi-skim milk", "semi skimmed",
    "semi skimmed dairy milk", "green milk", "semi milk",
    "semi-skimmed dairy milk"
  ],

  "skimmed milk": [
    "skim milk", "fat free milk", "fat-free milk",
    "zero fat milk", "skimmed dairy milk", "red milk"
  ],

  "oat milk": [
    "oat drink", "oat beverage", "barista oat milk",
    "unsweetened oat milk", "oatly", "oat milk alternative"
  ],

  "almond milk": [
    "almond drink", "almond beverage", "unsweetened almond milk",
    "sweetened almond milk", "barista almond milk"
  ],

  "soya milk": [
    "soy milk", "soya drink", "soy drink", "soybean milk",
    "unsweetened soya milk", "soya beverage"
  ],

  "double cream": [
    "heavy cream", "heavy whipping cream", "thick cream",
    "fresh double cream", "dairy double cream"
  ],

  "single cream": [
    "light cream", "pouring cream", "single pouring cream"
  ],

  "sour cream": [
    "soured cream", "creamy sour cream", "reduced fat sour cream"
  ],

  "creme fraiche": [
    "crème fraîche", "creme fresh", "french cream",
    "fresh creme fraiche", "reduced fat creme fraiche"
  ],

  "natural yoghurt": [
    "natural yogurt", "plain yoghurt", "plain yogurt",
    "unsweetened yoghurt", "unsweetened yogurt",
    "unflavoured yoghurt", "unflavoured yogurt"
  ],

  "greek yoghurt": [
    "greek yogurt", "greek style yoghurt", "greek style yogurt",
    "thick greek yoghurt", "strained yoghurt",
    "plain greek yoghurt", "greek natural yoghurt"
  ],

  "butter": [
    "block butter", "dairy butter", "cooking butter",
    "baking butter", "butter block"
  ],

  "salted butter": [
    "salted block butter", "salted dairy butter",
    "butter with salt"
  ],

  "unsalted butter": [
    "unsalted block butter", "unsalted dairy butter",
    "butter without salt"
  ],

  "margarine": [
    "marg", "vegetable margarine", "soft margarine",
    "baking margarine", "dairy free spread"
  ],

  "cheddar cheese": [
    "cheddar", "cheddar block", "grated cheddar",
    "grated cheese", "mature cheese", "mature cheddar cheese",
    "mild cheddar", "medium cheddar", "extra mature cheddar",
    "cheese block", "cheese for sandwiches",
    "cheese for cooking", "cheddar slices"
  ],

  "mozzarella": [
    "mozzarella ball", "mozzarella balls", "fresh mozzarella",
    "grated mozzarella", "shredded mozzarella",
    "mozzarella pearls"
  ],

  "parmesan": [
    "parmesan cheese", "grated parmesan cheese",
    "parmigiano reggiano", "grated parmesan",
    "hard italian cheese"
  ],

  "feta cheese": [
    "feta", "feta block", "greek feta", "crumbled feta",
    "feta crumbles"
  ],

  "cream cheese": [
    "soft cheese", "soft cream cheese", "spreadable cheese",
    "plain soft cheese", "full fat cream cheese",
    "light cream cheese"
  ],

  "cottage cheese": [
    "cottage cheese pot", "low fat cottage cheese",
    "full fat cottage cheese"
  ],

  "ricotta": [
    "ricotta cheese", "ricotta tub"
  ],

  "halloumi": [
    "halloumi cheese", "halloumi block", "grilling cheese"
  ],

  "eggs": [
    "egg", "chicken eggs", "hen eggs", "medium eggs",
    "extra large eggs", "jumbo eggs", "dozen eggs",
    "12 eggs", "six eggs", "free range egg",
    "large free range eggs"
  ],

  // =========================================================
  // VEGETABLES
  // =========================================================

  "white potatoes": [
    "potato", "potatoes", "white potato", "white potatoes",
    "baking potatoes", "jacket potatoes", "maris piper potatoes",
    "floury potatoes", "new potatoes", "baby potatoes",
    "roasting potatoes", "mashing potatoes", "mash potatoes"
  ],

  "sweet potatoes": [
    "sweet potato", "sweet potato chunks", "orange sweet potato",
    "sweet potato cubes"
  ],

  "red onions": [
    "red onion", "purple onion", "red salad onion",
    "red onions sliced", "red onions diced"
  ],

  "brown onions": [
    "onion", "onions", "white onion", "brown onion",
    "yellow onion", "cooking onions", "brown cooking onions",
    "diced onion", "chopped onion", "onion chunks",
    "onion pieces"
  ],

  "spring onions": [
    "spring onion", "scallions", "green onions",
    "salad onions", "bunch of spring onions"
  ],

  "shallots": [
    "shallot", "eschalots", "small onions", "french shallots"
  ],

  "garlic": [
    "garlic clove", "garlic cloves", "garlic bulb",
    "bulb of garlic", "fresh garlic", "whole garlic",
    "garlic bulbs", "peeled garlic cloves"
  ],

  "ginger": [
    "fresh ginger", "ginger root", "root ginger",
    "ginger piece", "fresh ginger root", "ginger knob"
  ],

  "carrots": [
    "carrot", "carrots", "fresh carrot", "fresh carrots",
    "large carrots", "baby carrots", "chantenay carrots",
    "diced carrots", "chopped carrots", "grated carrot"
  ],

  "parsnips": [
    "parsnip", "fresh parsnips", "parsnip root"
  ],

  "broccoli": [
    "broccoli head", "broccoli florets", "broccoli pieces",
    "fresh broccoli", "broccoli crowns", "tenderstem broccoli"
  ],

  "cauliflower": [
    "cauliflower head", "cauliflower florets",
    "fresh cauliflower", "cauli"
  ],

  "green cabbage": [
    "cabbage", "white cabbage", "savoy cabbage",
    "green cabbage head", "cabbage leaves"
  ],

  "red cabbage": [
    "red cabbage head", "purple cabbage", "shredded red cabbage"
  ],

  "spinach": [
    "fresh spinach", "baby spinach", "spinach leaves",
    "spinach leaf", "spinach bag"
  ],

  "lettuce": [
    "iceberg", "iceberg lettuce", "lettuce leaves",
    "salad lettuce", "round lettuce"
  ],

  "mixed salad leaves": [
    "salad leaves", "mixed leaves", "mixed leaf salad",
    "salad mix", "baby leaf salad", "salad bag",
    "mixed lettuce leaves"
  ],

  "cucumber": [
    "cucumbers", "cucumber slices", "mini cucumber",
    "baby cucumber", "salad cucumber"
  ],

  "courgette": [
    "zucchini", "courgettes", "green courgette",
    "courgette slices", "diced courgette"
  ],

  "aubergine": [
    "eggplant", "aubergines", "aubergine slices",
    "baby aubergine"
  ],

  "red bell peppers": [
    "red pepper", "red peppers", "bell pepper red",
    "red capsicum", "red capsicums", "sweet red pepper",
    "red pepper strips", "diced red pepper"
  ],

  "green bell peppers": [
    "green pepper", "green peppers", "bell pepper green",
    "green capsicum", "green capsicums",
    "sweet green pepper", "diced green pepper"
  ],

  "yellow bell peppers": [
    "yellow pepper", "yellow peppers", "bell pepper yellow",
    "yellow capsicum", "yellow capsicums",
    "sweet yellow pepper"
  ],

  "mixed bell peppers": [
    "mixed peppers", "mixed capsicums", "pepper mix",
    "bell pepper mix", "red green and yellow peppers",
    "three peppers", "tricolour peppers"
  ],

  "fresh tomatoes": [
    "tomato", "tomatoes", "salad tomatoes", "standard tomatoes",
    "round tomatoes", "vine tomatoes", "fresh tomato",
    "chopped fresh tomatoes", "diced fresh tomatoes"
  ],

  "cherry tomatoes": [
    "cherry tomato", "baby tomatoes", "mini tomatoes",
    "tomato cherries", "small tomatoes"
  ],

  "plum tomatoes": [
    "plum tomato", "roma tomatoes", "roma tomato",
    "italian plum tomatoes"
  ],

  "mushrooms": [
    "mushroom", "fresh mushrooms", "button mushrooms",
    "closed cup mushrooms", "white mushrooms",
    "chestnut mushrooms", "sliced mushrooms",
    "diced mushrooms", "mushroom pieces"
  ],

  "leeks": [
    "leek", "fresh leek", "leek sticks", "leek pieces",
    "sliced leeks", "chopped leeks"
  ],

  "celery": [
    "celery sticks", "celery stalks", "celery stick",
    "celery bunch", "fresh celery", "celery ribs"
  ],

  "sweetcorn": [
    "corn", "sweet corn", "sweetcorn kernels",
    "corn kernels", "sweet corn kernels", "corn niblets"
  ],

  "corn on the cob": [
    "corn cobs", "sweetcorn cobs", "sweet corn on the cob",
    "corn cob", "corn ears", "fresh corn cobs"
  ],

  "green beans": [
    "green bean", "fine beans", "runner beans",
    "fresh green beans", "string beans", "french beans"
  ],

  "brussels sprouts": [
    "brussel sprouts", "brussel sprout", "sprouts",
    "fresh sprouts"
  ],

  "butternut squash": [
    "butternut", "butternut pumpkin", "squash",
    "butternut squash cubes", "diced butternut squash"
  ],

  "beetroot": [
    "beets", "beet", "fresh beetroot", "cooked beetroot",
    "beetroot pieces", "beetroot slices"
  ],

  "fresh chillies": [
    "chilli", "chillies", "chili", "chilies",
    "fresh chilli", "red chilli", "green chilli",
    "red chillies", "green chillies", "fresh chili peppers"
  ],

  "fresh parsley": [
    "parsley", "flat leaf parsley", "flat-leaf parsley",
    "curly parsley", "fresh flat parsley", "parsley bunch"
  ],

  "fresh coriander": [
    "coriander", "cilantro", "fresh cilantro",
    "coriander leaves", "fresh coriander leaves",
    "coriander bunch"
  ],

  "fresh basil": [
    "basil", "basil leaves", "fresh basil leaves",
    "basil plant", "sweet basil"
  ],

  "fresh mint": [
    "mint", "mint leaves", "fresh mint leaves",
    "mint bunch", "spearmint"
  ],

  // =========================================================
  // FRUIT
  // =========================================================

  "bananas": [
    "banana", "ripe bananas", "fresh bananas",
    "banana bunch", "bananas bunch"
  ],

  "apples": [
    "apple", "fresh apples", "eating apples",
    "cooking apples", "red apples", "green apples",
    "braeburn apples", "gala apples", "pink lady apples",
    "granny smith apples"
  ],

  "oranges": [
    "orange", "fresh oranges", "large oranges",
    "navel oranges", "juice oranges"
  ],

  "lemons": [
    "lemon", "fresh lemon", "lemon fruit",
    "lemon juice fruit", "unwaxed lemons"
  ],

  "limes": [
    "lime", "fresh lime", "green lime",
    "lime fruit"
  ],

  "strawberries": [
    "strawberry", "fresh strawberries", "fresh strawberry",
    "strawberry punnet"
  ],

  "blueberries": [
    "blueberry", "fresh blueberries", "fresh blueberry"
  ],

  "raspberries": [
    "raspberry", "fresh raspberries", "fresh raspberry"
  ],

  "blackberries": [
    "blackberry", "fresh blackberries"
  ],

  "grapes": [
    "grape", "fresh grapes", "green grapes",
    "red grapes", "white grapes", "seedless grapes",
    "black grapes"
  ],

  "pineapple": [
    "pineapples", "fresh pineapple", "whole pineapple",
    "pineapple chunks", "pineapple pieces"
  ],

  "mango": [
    "mangoes", "fresh mango", "mango fruit",
    "ripe mango", "mango pieces", "mango chunks"
  ],

  "kiwi fruit": [
    "kiwi", "kiwis", "kiwi fruit", "green kiwi",
    "fresh kiwi"
  ],

  "pears": [
    "pear", "fresh pears", "conference pears",
    "ripe pears", "green pears"
  ],

  "peaches": [
    "peach", "fresh peaches", "fresh peach"
  ],

  "nectarines": [
    "nectarine", "fresh nectarines"
  ],

  "plums": [
    "plum", "fresh plums", "fresh plum"
  ],

  "avocado": [
    "avocados", "avocado pear", "ripe avocado",
    "fresh avocado", "avocado halves"
  ],

  // =========================================================
  // FROZEN VEGETABLES & FRUIT
  // =========================================================

  "frozen peas": [
    "peas", "garden peas", "petit pois", "frozen garden peas",
    "petit pois frozen", "green peas"
  ],

  "frozen sweetcorn": [
    "frozen corn", "frozen sweet corn", "sweetcorn frozen",
    "frozen corn kernels"
  ],

  "frozen mixed vegetables": [
    "mixed veg", "mixed vegetables", "frozen mixed veg",
    "vegetable medley", "frozen veg mix",
    "mixed frozen vegetables"
  ],

  "frozen green beans": [
    "frozen beans", "frozen fine beans", "frozen french beans"
  ],

  "frozen berries": [
    "mixed berries", "frozen mixed berries",
    "summer fruits", "frozen summer fruits",
    "berry mix", "frozen berry mix"
  ],

  "frozen strawberries": [
    "frozen strawberry", "strawberries frozen"
  ],

  "frozen mango": [
    "frozen mango chunks", "mango frozen",
    "frozen mango pieces"
  ],

  "frozen chips": [
    "chips", "french fries", "frozen chips",
    "oven chips", "straight cut chips", "skin on fries",
    "frozen french fries"
  ],

  "frozen potato wedges": [
    "potato wedges", "frozen wedges", "oven wedges",
    "seasoned wedges"
  ],

  // =========================================================
  // BREAD & BAKERY
  // =========================================================

  "white bread": [
    "white loaf", "loaf of white bread", "sliced white bread",
    "white sliced loaf", "toast bread", "sandwich bread",
    "white sandwich loaf"
  ],

  "wholemeal bread": [
    "brown bread", "wholemeal loaf", "wholemeal sliced bread",
    "brown loaf", "whole wheat bread", "wholewheat bread",
    "wholemeal sandwich bread"
  ],

  "sourdough bread": [
    "sourdough loaf", "sourdough slices",
    "sour dough bread", "sourdough"
  ],

  "bagels": [
    "bagel", "plain bagel", "plain bagels",
    "sesame bagels", "seeded bagels"
  ],

  "burger buns": [
    "burger bun", "burger rolls", "hamburger buns",
    "brioche burger buns", "brioche buns", "burger rolls"
  ],

  "tortilla wraps": [
    "wraps", "tortilla", "tortillas", "flour tortillas",
    "plain wraps", "soft wraps", "flour wraps",
    "mexican wraps"
  ],

  "wholemeal wraps": [
    "brown wraps", "whole wheat wraps",
    "wholemeal tortilla wraps", "wholegrain wraps"
  ],

  "pitta bread": [
    "pitta", "pita bread", "pita", "pitta breads",
    "pitta pockets", "pita pockets"
  ],

  "naan bread": [
    "naan", "naan breads", "plain naan",
    "garlic naan", "indian flatbread"
  ],

  "garlic bread": [
    "garlic baguette", "garlic loaf", "garlic slices",
    "garlic bread slices", "frozen garlic bread"
  ],

  "puff pastry": [
    "puff pastry sheet", "puff pastry sheets",
    "ready rolled puff pastry", "ready roll puff pastry",
    "puff pastry block"
  ],

  "shortcrust pastry": [
    "short crust pastry", "shortcrust pastry sheet",
    "ready rolled shortcrust pastry", "shortcrust pastry block"
  ],

  // =========================================================
  // RICE, PASTA & GRAINS
  // =========================================================

  "pasta": [
    "dried pasta", "dry pasta", "pasta shapes",
    "pasta spirals", "pasta tubes", "plain pasta",
    "regular pasta", "white pasta"
  ],

  "spaghetti": [
    "spaghetti pasta", "dried spaghetti", "dry spaghetti",
    "spag bol pasta"
  ],

  "penne pasta": [
    "penne", "penne rigate", "pasta penne"
  ],

  "fusilli pasta": [
    "fusilli", "spiral pasta", "twisty pasta",
    "corkscrew pasta"
  ],

  "macaroni": [
    "macaroni pasta", "macaroni elbows", "elbow pasta",
    "macaroni elbows"
  ],

  "lasagne sheets": [
    "lasagne", "lasagna sheets", "lasagne pasta sheets",
    "dried lasagne sheets", "lasagna pasta"
  ],

  "egg noodles": [
    "egg noodle", "chinese egg noodles",
    "medium egg noodles", "dried egg noodles"
  ],

  "rice noodles": [
    "rice noodle", "vermicelli rice noodles",
    "thin rice noodles", "flat rice noodles"
  ],

  "white rice": [
    "rice", "long grain", "long grain white rice",
    "white long grain rice", "plain white rice",
    "cooking rice", "regular rice"
  ],

  "basmati rice": [
    "basmati", "basmati grain rice",
    "white basmati rice", "long grain basmati"
  ],

  "brown rice": [
    "wholegrain rice", "whole grain rice",
    "brown long grain rice", "wholemeal rice"
  ],

  "risotto rice": [
    "arborio rice", "risotto", "short grain risotto rice"
  ],

  "microwave rice": [
    "microwaveable rice", "ready cooked rice",
    "microwave rice pouch", "rice pouch",
    "pre cooked rice", "precooked rice"
  ],

  "couscous": [
    "cous cous", "plain couscous", "dried couscous"
  ],

  "quinoa": [
    "quinoa grains", "white quinoa", "red quinoa",
    "mixed quinoa"
  ],

  "oats": [
    "porridge oats", "rolled oats", "oat flakes",
    "jumbo oats", "porridge", "oatmeal",
    "plain oats", "breakfast oats"
  ],

  // =========================================================
  // TINS, PULSES & JARRED FOOD
  // =========================================================

  "chopped tomatoes": [
    "tinned tomatoes", "canned tomatoes", "chopped tomato",
    "canned chopped tomatoes", "tomato tins",
    "tin of tomatoes", "tomatoes in juice",
    "diced tomatoes", "tomato chunks"
  ],

  "passata": [
    "tomato passata", "sieved tomatoes",
    "strained tomatoes", "smooth tomato sauce",
    "passata sauce"
  ],

  "tomato puree": [
    "tomato paste", "tomato concentrate",
    "double concentrated tomato puree",
    "tomato purée"
  ],

  "baked beans": [
    "tin baked beans", "tinned baked beans",
    "beans in tomato sauce", "canned baked beans",
    "baked bean tin"
  ],

  "kidney beans": [
    "red kidney beans", "tinned kidney beans",
    "canned kidney beans", "kidney bean tin"
  ],

  "black beans": [
    "black bean", "tinned black beans",
    "canned black beans"
  ],

  "cannellini beans": [
    "white kidney beans", "white beans",
    "tinned cannellini beans", "canned cannellini beans"
  ],

  "butter beans": [
    "butterbean", "butterbeans", "large lima beans",
    "lima beans", "tinned butter beans"
  ],

  "chickpeas": [
    "chick pea", "garbanzo beans", "garbanzo",
    "tinned chickpeas", "canned chickpeas",
    "chickpea tin"
  ],

  "lentils": [
    "tinned lentils", "canned lentils", "brown lentils",
    "green tinned lentils", "cooked lentils"
  ],

  "red lentils": [
    "red lentil", "dried red lentils", "split red lentils",
    "red split lentils"
  ],

  "green lentils": [
    "green lentil", "dried green lentils",
    "puy lentils", "french green lentils"
  ],

  "coconut milk": [
    "coconut cream drink", "tinned coconut milk",
    "canned coconut milk", "full fat coconut milk",
    "light coconut milk"
  ],

  "sweetcorn tin": [
    "tinned sweetcorn", "canned sweetcorn",
    "tin sweetcorn", "sweetcorn can",
    "corn tin", "canned corn"
  ],

  "tinned peas": [
    "canned peas", "tin peas", "peas in a tin"
  ],

  "tinned carrots": [
    "canned carrots", "carrots in a tin"
  ],

  "tinned pineapple": [
    "canned pineapple", "pineapple chunks tin",
    "pineapple rings tin", "pineapple in juice"
  ],

  // =========================================================
  // OILS & VINEGARS
  // =========================================================

  "olive oil": [
    "extra virgin olive oil", "extra virgin oil",
    "virgin olive oil", "cooking olive oil",
    "olive cooking oil", "light olive oil",
    "olive oil bottle"
  ],

  "vegetable oil": [
    "cooking oil", "vegetable cooking oil",
    "generic cooking oil", "frying oil"
  ],

  "sunflower oil": [
    "sunflower cooking oil", "sunflower frying oil"
  ],

  "rapeseed oil": [
    "rapeseed cooking oil", "cold pressed rapeseed oil",
    "canola oil"
  ],

  "sesame oil": [
    "toasted sesame oil", "sesame seed oil"
  ],

  "balsamic vinegar": [
    "balsamic", "balsamic glaze vinegar",
    "balsamic dressing vinegar"
  ],

  "white wine vinegar": [
    "white wine vin", "white vinegar for cooking"
  ],

  "red wine vinegar": [
    "red wine vin"
  ],

  "apple cider vinegar": [
    "apple vinegar", "cider vinegar", "apple cider vin"
  ],

  // =========================================================
  // HERBS & SPICES
  // =========================================================

  "salt": [
    "cooking salt", "fine salt", "table salt",
    "white salt", "salt shaker"
  ],

  "sea salt": [
    "coarse sea salt", "fine sea salt",
    "sea salt flakes", "salt flakes"
  ],

  "black pepper": [
    "pepper", "ground pepper", "black pepper powder",
    "pepper powder", "cracked black pepper",
    "black peppercorns", "peppercorns"
  ],

  "white pepper": [
    "ground white pepper", "white pepper powder"
  ],

  "paprika": [
    "sweet paprika", "plain paprika", "paprika powder",
    "ground sweet paprika"
  ],

  "smoked paprika": [
    "smoky paprika", "smoked paprika powder"
  ],

  "chilli powder": [
    "chili powder", "ground chilli", "chilli seasoning",
    "hot chilli powder", "mild chilli powder"
  ],

  "cayenne pepper": [
    "cayenne", "cayenne powder", "ground cayenne"
  ],

  "cumin": [
    "ground cumin", "cumin powder", "cumin spice",
    "jeera powder"
  ],

  "coriander powder": [
    "ground coriander", "coriander spice",
    "coriander seed powder", "dhania powder"
  ],

  "turmeric": [
    "ground turmeric", "turmeric powder",
    "haldi powder"
  ],

  "curry powder": [
    "mild curry powder", "medium curry powder",
    "hot curry powder", "indian curry powder",
    "curry spice"
  ],

  "garam masala": [
    "garam masala powder", "indian spice mix"
  ],

  "cinnamon": [
    "ground cinnamon", "cinnamon powder",
    "cinnamon spice"
  ],

  "nutmeg": [
    "ground nutmeg", "nutmeg powder",
    "whole nutmeg"
  ],

  "mixed herbs": [
    "dried mixed herbs", "italian herbs",
    "mixed dried herbs", "herb seasoning"
  ],

  "dried oregano": [
    "oregano", "oregano leaves", "oregano seasoning"
  ],

  "dried basil": [
    "basil", "basil seasoning", "basil flakes"
  ],

  "dried thyme": [
    "thyme", "thyme seasoning", "thyme leaves"
  ],

  "dried rosemary": [
    "rosemary", "rosemary seasoning", "rosemary leaves"
  ],

  "chilli flakes": [
    "chili flakes", "red pepper flakes",
    "crushed chillies", "crushed red pepper",
    "dried chilli flakes"
  ],

  "garlic granules": [
    "granulated garlic", "garlic powder",
    "dried garlic", "ground garlic"
  ],

  "onion powder": [
    "dried onion powder", "ground onion",
    "onion granules"
  ],

  "ground ginger": [
    "ginger powder", "dried ginger",
    "ginger spice"
  ],

  "five spice": [
    "five spice powder", "chinese five spice powder",
    "chinese spice mix"
  ],

  // =========================================================
  // SAUCES & CONDIMENTS
  // =========================================================

  "tomato ketchup": [
    "ketchup", "tomato sauce", "red sauce",
    "tomato condiment", "tomato ketchup sauce"
  ],

  "mayonnaise": [
    "mayo", "full fat mayo", "full fat mayonnaise",
    "regular mayonnaise", "salad cream style mayo"
  ],

  "light mayonnaise": [
    "low fat mayo", "lighter mayonnaise",
    "reduced fat mayonnaise", "light mayo"
  ],

  "brown sauce": [
    "hp sauce", "brown condiment", "steak sauce",
    "british brown sauce"
  ],

  "barbecue sauce": [
    "bbq sauce", "barbeque sauce", "barbecue marinade",
    "smoky bbq sauce", "smoky barbecue sauce"
  ],

  "sweet chilli sauce": [
    "sweet chili sauce", "thai sweet chilli sauce",
    "sweet chilli dipping sauce"
  ],

  "soy sauce": [
    "soya sauce", "light soy sauce", "regular soy sauce",
    "soy seasoning sauce"
  ],

  "dark soy sauce": [
    "dark soya sauce", "thick soy sauce"
  ],

  "teriyaki sauce": [
    "teriyaki marinade", "japanese teriyaki sauce"
  ],

  "worcestershire sauce": [
    "worcester sauce", "lea and perrins sauce",
    "worcestershire"
  ],

  "hot sauce": [
    "chilli sauce", "chili sauce", "hot chilli sauce",
    "spicy sauce", "pepper sauce"
  ],

  "mustard": [
    "english mustard", "yellow mustard",
    "mustard sauce", "prepared mustard"
  ],

  "wholegrain mustard": [
    "whole grain mustard", "grain mustard",
    "seeded mustard"
  ],

  "dijon mustard": [
    "dijon", "french mustard", "dijon style mustard"
  ],

  "pesto": [
    "green pesto", "basil pesto sauce",
    "green basil pesto", "pesto sauce"
  ],

  "red pesto": [
    "sun dried tomato pesto", "sundried tomato pesto",
    "red tomato pesto"
  ],

  "hummus": [
    "houmous", "hoummus", "chickpea dip",
    "classic hummus", "plain hummus"
  ],

  "curry paste": [
    "curry sauce paste", "curry cooking paste",
    "indian curry paste"
  ],

  "thai red curry paste": [
    "red thai curry paste", "thai red paste",
    "red curry paste"
  ],

  "thai green curry paste": [
    "green thai curry paste", "thai green paste",
    "green curry paste"
  ],

  "harissa paste": [
    "harissa", "chilli harissa", "harissa chilli paste"
  ],

  "miso paste": [
    "miso", "japanese miso paste", "white miso",
    "red miso", "soybean miso paste"
  ],

  "stock cubes": [
    "vegetable stock cube", "veg stock cubes",
    "veg stock cube", "vegetable bouillon cubes",
    "vegetable bouillon"
  ],

  "chicken stock cubes": [
    "chicken stock cube", "chicken bouillon cubes",
    "chicken bouillon", "chicken stock"
  ],

  "beef stock cubes": [
    "beef stock cube", "beef bouillon cubes",
    "beef bouillon", "beef stock"
  ],

  "gravy granules": [
    "gravy", "instant gravy", "gravy powder",
    "beef gravy granules", "bisto style gravy"
  ],

  // =========================================================
  // BAKING & SWEET INGREDIENTS
  // =========================================================

  "plain flour": [
    "flour", "white flour", "all purpose flour",
    "all-purpose flour", "plain white flour",
    "baking flour", "regular flour"
  ],

  "self raising flour": [
    "self raising", "self-raising", "self raising white flour",
    "self raising baking flour"
  ],

  "strong bread flour": [
    "bread flour", "strong white flour",
    "strong flour", "strong white bread flour"
  ],

  "wholemeal flour": [
    "whole wheat flour", "wholewheat flour",
    "brown flour", "wholemeal baking flour"
  ],

  "cornflour": [
    "corn flour", "corn starch", "cornstarch",
    "cornflour powder"
  ],

  "baking powder": [
    "baking powder sachet", "raising powder"
  ],

  "bicarbonate of soda": [
    "bicarbonate soda", "bicarb", "bicarb soda",
    "baking soda", "sodium bicarbonate"
  ],

  "dried yeast": [
    "yeast", "fast action yeast", "instant yeast",
    "easy bake yeast", "active dry yeast",
    "dried baking yeast"
  ],

  "caster sugar": [
    "castor sugar", "white caster sugar",
    "baking caster sugar", "superfine sugar"
  ],

  "granulated sugar": [
    "white sugar", "regular sugar", "sugar",
    "granulated white sugar"
  ],

  "brown sugar": [
    "light brown sugar", "soft brown sugar",
    "light soft brown sugar"
  ],

  "dark brown sugar": [
    "dark soft brown sugar", "dark muscovado sugar",
    "muscovado sugar"
  ],

  "icing sugar": [
    "powdered sugar", "confectioners sugar",
    "confectioners' sugar", "icing sugar powder"
  ],

  "demerara sugar": [
    "raw cane sugar", "demerara"
  ],

  "cocoa powder": [
    "cacao powder", "unsweetened cocoa powder",
    "baking cocoa", "cocoa"
  ],

  "dark chocolate": [
    "dark choc", "plain chocolate", "dark cooking chocolate",
    "dark chocolate bar", "baking dark chocolate"
  ],

  "milk chocolate": [
    "milk choc", "milk chocolate bar",
    "milk cooking chocolate"
  ],

  "white chocolate": [
    "white choc", "white chocolate bar",
    "white cooking chocolate"
  ],

  "chocolate chips": [
    "choc chips", "chocolate chunks",
    "chocolate drops", "baking chocolate chips"
  ],

  "ground almonds": [
    "almond meal", "almond flour", "finely ground almonds"
  ],

  "almond flakes": [
    "flaked almonds", "sliced almonds"
  ],

  "raisins": [
    "raisin", "seedless raisins", "baking raisins"
  ],

  "sultanas": [
    "sultana", "golden raisins", "baking sultanas"
  ],

  "dried cranberries": [
    "cranberries dried", "sweetened dried cranberries"
  ],

  "mixed dried fruit": [
    "dried mixed fruit", "mixed fruit", "cake fruit mix",
    "dried fruit mix", "fruit cake mix"
  ],

  // =========================================================
  // NUTS & SEEDS
  // =========================================================

  "walnuts": [
    "walnut", "walnut pieces", "chopped walnuts",
    "walnut halves", "shelled walnuts"
  ],

  "almonds": [
    "almond", "whole almonds", "blanched almonds",
    "shelled almonds", "raw almonds"
  ],

  "cashews": [
    "cashew nuts", "cashew", "whole cashews",
    "roasted cashews", "raw cashews"
  ],

  "pecans": [
    "pecan nuts", "pecan", "pecan halves",
    "chopped pecans"
  ],

  "hazelnuts": [
    "hazelnut", "whole hazelnuts", "chopped hazelnuts"
  ],

  "pistachios": [
    "pistachio nuts", "pistachio", "shelled pistachios"
  ],

  "peanuts": [
    "peanut", "groundnuts", "roasted peanuts",
    "unsalted peanuts", "salted peanuts"
  ],

  "pumpkin seeds": [
    "pepitas", "pumpkin seed", "shelled pumpkin seeds"
  ],

  "sunflower seeds": [
    "sunflower seed", "shelled sunflower seeds"
  ],

  "chia seeds": [
    "chia", "chia seed"
  ],

  "flaxseed": [
    "linseed", "flax seeds", "flax seed",
    "ground flaxseed", "milled linseed"
  ],

  "sesame seeds": [
    "sesame seed", "white sesame seeds",
    "black sesame seeds", "toasted sesame seeds"
  ],

  // =========================================================
  // BREAKFAST
  // =========================================================

  "cornflakes": [
    "corn flakes", "cornflake cereal", "maize flakes"
  ],

  "bran flakes": [
    "bran cereal", "wheat bran flakes"
  ],

  "shredded wheat": [
    "shredded wheat cereal", "wheat biscuits"
  ],

  "rice krispies": [
    "rice crispies", "rice pops", "puffed rice cereal"
  ],

  "weetabix": [
    "wheat biscuits cereal", "wheat biscuit cereal"
  ],

  "porridge sachets": [
    "porridge packets", "instant porridge sachets",
    "oatmeal sachets", "porridge pots"
  ],

  // =========================================================
  // DRINKS
  // =========================================================

  "orange juice": [
    "fresh orange juice", "not from concentrate orange juice",
    "orange squash juice", "smooth orange juice",
    "with bits orange juice", "no bits orange juice"
  ],

  "apple juice": [
    "clear apple juice", "pure apple juice",
    "apple drink", "pressed apple juice"
  ],

  "cloudy apple juice": [
    "cloudy juice", "cloudy pressed apple juice"
  ],

  "cranberry juice": [
    "cranberry drink", "cranberry juice drink"
  ],

  "pineapple juice": [
    "pineapple drink", "pure pineapple juice"
  ],

  "squash": [
    "diluting juice", "fruit squash", "blackcurrant squash",
    "orange squash", "lemon squash", "cordial"
  ],

  "cola": [
    "cola drink", "coke", "coca cola", "diet cola",
    "zero cola", "fizzy cola"
  ],

  "lemonade": [
    "fizzy lemonade", "clear lemonade", "lemonade drink"
  ],

  "sparkling water": [
    "carbonated water", "fizzy water",
    "soda water", "bubbly water"
  ],

  "still water": [
    "bottled water", "mineral water", "flat water"
  ],

  "tea bags": [
    "tea bag", "black tea bags", "breakfast tea",
    "english breakfast tea", "tea bags box"
  ],

  "ground coffee": [
    "coffee grounds", "filter coffee", "ground arabica coffee",
    "roast and ground coffee"
  ],

  "instant coffee": [
    "coffee granules", "instant coffee granules",
    "freeze dried coffee", "instant coffee powder"
  ],

  "hot chocolate powder": [
    "hot chocolate", "drinking chocolate",
    "chocolate drink powder", "hot cocoa"
  ],

  // General ingredient names should use these default matches.

"chicken breast": [
  "chicken",
  "chicken meat",
  "fresh chicken",
  "raw chicken",
  "chicken pieces",
  "chicken fillet",
  "chicken fillets",
  "chicken breast fillet",
  "chicken breasts"
],

"beef mince": [
  "mince",
  "mince meat",
  "minced meat",
  "minced beef",
  "ground beef",
  "beef"
],

"cheddar cheese": [
  "cheese",
  "grated cheese",
  "cheese block",
  "cheese slices",
  "mature cheese",
  "cheddar",
  "cheese for cooking"
], "red pepper": [
  "pepper",
  "red peppers",
  "bell pepper",
  "bell peppers",
  "sweet pepper",
  "sweet peppers"
],

"brown onions": [
  "onion",
  "onions",
  "red onion",
  "red onions",
  "white onion",
  "white onions",
  "yellow onion",
  "yellow onions"
],

"garlic bulbs": [
  "garlic",
  "garlic bulb",
  "garlic bulbs",
  "whole garlic",
  "whole garlic bulb"
],

"rice packets": [
  "rice",
  "packet rice",
  "pack of rice",
  "rice packet",
  "rice packets",
  "white rice",
  "long grain rice"
],

"tuna tin": [
  "tuna",
  "tinned tuna",
  "tin tuna",
  "tuna tin",
  "tuna tins",
  "canned tuna"
],

"pizza": [
  "pizzas",
  "frozen pizza",
  "frozen pizzas",
  "cheese pizza"
]
};


/*
 * Add the extra aliases to the existing database.
 * Duplicate aliases are automatically removed.
 */

for (const product of FOOD_PRICE_DATABASE) {

  const extraAliases = EXTRA_FOOD_ALIASES[product.name] || [];

  product.aliases = [
    ...new Set([
      ...(product.aliases || []),
      ...extraAliases
    ])
  ];

}

