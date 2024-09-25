/**
 * establishments and dishes
 */
var restNames = ["Little Ari's", "Slices Pizza by Tony", "Mac's Speed Shop"];
var restDescs = [
                    "<b>Mon - Fri:</b> 11am - 9pm </p><p><b>Sat & Sun:</b> 12pm - 9pm </p><p>4129 Spring Garden St, Greensboro, NC 27407 </p><p>Awesome hibachi with just a short wait.",
                    "<b>Mon - Sat:</b> 11am - 9:20pm </p><p><b>Sun:</b> closed </p><p>401 Tate St, Greensboro, NC 27403 </p><p>Slices by Tony is a locally owned and operated authentic Italian Restaurant with a unique menu. </p><p>(All images are from Tony's online menu)",
                    "</p><p><b>Sun - Wed:</b> 11am - 10pm </p><p><b>Thur - Sat:</b> 11am - 11pm </p><p>1218 Battleground Ave, Greensboro, NC 27408 </p><p>BBQ &#9733; Beer &#9733; Bikes"
                ];
var restLinks = [
                    [
                        "https://littleari.com/",
                        "https://slicesbytony.com/",
                        "https://macspeedshop.com/locations/greensboro/"
                    ]
                ];

var itemNames = [   ["Katsu Chicken", "Ramen Bowl", "Onigiri Rice Balls"],
                    ["Garlic Knots", "Spaghetti with Meatballs", "Cheese Pizza"],
                    ["Hush Puppies", "Route 66 Burger", "Hot Fudge Brownie for two"]
                ];
var itemImgs =  [   
                    [
                        "https://live.staticflickr.com/2757/4290320011_e0ca02243d_b.jpg",
                        "https://images.pexels.com/photos/17592743/pexels-photo-17592743/free-photo-of-close-up-of-a-bowl-of-ramen.jpeg",
                        "https://cdn12.picryl.com/photo/2016/12/31/rice-ball-food-diet-food-drink-f9306f-1024.jpg"
                    ],
                    [
                        "https://slice-menu-assets-prod.imgix.net/9337/1630403444_d0034bad80?fit=crop&w=480&h=480",
                        "https://slice-menu-assets-prod.imgix.net/9337/1630403541_e5999b50c6?fit=crop&w=6000&h=3750",
                        "https://slice-menu-assets-prod.imgix.net/9337/1630403404_5c4a121873?fit=crop&w=480&h=480"
                    ],
                    [
                        "https://live.staticflickr.com/7185/6911341874_a5c3c266a2_b.jpg",
                        "https://live.staticflickr.com/2718/4386957780_b008c9a393_b.jpg",
                        "https://live.staticflickr.com/231/523129826_61dcb4cdbb_b.jpg"
                    ]
                ];
var itemDescs = [   
                    [
                        "Deep-fried with panko breadcrumbs, this dish is absolutely to dine for! (Image by Arnold Gatilao)</p><p> $", 
                        "A big bowl of chicken ramen with pork belly is the best to enjoy after a long day. (Image by Amar Preciado)</p><p> $", 
                        "On the go? Shiojake onigiri is filled with salmon and has crispy seaweed to help you hold this yummy snack! (Image from pixabay.com)</p><p> $"
                    ],
                    [
                        "Delicious! </p><p> 6 pieces: $", 
                        "Yum! </p><p> $", 
                        "The best cheese pizza in the area! </p><p> small: $"
                    ],
                    [
                        "I will literally go to this restaurant just for these puppies. They have honey butter that is <b>so</b> good with them. (Image by jshyun)</p><p> dine-in: $",
                        "1/2 lb. burger, white american cheese, applewood-smoked bacon, smoked garlic aioli, lettuce, tomato & onion. (Image by Michael Saechang)</p><p> $",
                        "Served warm with vanilla ice cream, chocolate syrup, and caramel. (Image by Premshree Pillai)</p><p> $"
                    ]
                ];
var itemCosts = [
                    [11.75, 11.95, 2.25],
                    [5.99, 16.99, 11.99],
                    [1.50, 14.30, 8.80]
                ];


/**
 * articles
 */
var artTitles = [
                        "Childhood favorites at Little Ari's Japanese Kitchen",
                        "Grilling tips from the pros at Mac's Speed Shop",
                        "Mac's Speed Shop is treating veterans to a free meal on Veterans Day"
                    ];
var artAuthors =    [
                        "Sayaka Matsuoka",
                        "Eric Chilton",
                        "Meilin Tompkins "
                    ];
var artPublishers = [
                        "Triad City Beat",
                        "WFMY News 2",
                        "WCNC Charlotte"
                    ];
var artDates =      [
                        "Jan 31, 2019",
                        "Jun 24, 2021",
                        "Nov 3, 2022"
                    ];
var artLinks =      [
                        "https://triad-city-beat.com/childhood-favorites-at-little-aris-japanese-kitchen/",
                        "https://www.wfmynews2.com/article/entertainment/grilling-tips-from-the-pros-at-macs-speed-shop/83-6a85d443-46dc-4022-9555-268fe22520e0",
                        "https://www.wcnc.com/article/life/food/macs-speed-shop-free-meal-veterans-day/275-2b2b2c0f-c853-445b-96a5-428294c799a1"
                    ];