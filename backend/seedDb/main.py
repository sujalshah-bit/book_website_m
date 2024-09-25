import requests
import json

# Your API URL
url = 'http://localhost:5000/books'

# Sample data (you mentioned 8 of these; I've included just one example here)
books = [
    {
        "asin": "0007350813",
        "ISBN10": "0007350813",
        "answered_questions": 0,
        "availability": "In Stock.",
        "brand": "Emily Brontë",
        "currency": "USD",
        "date_first_available": None,
        "delivery": [
          "FREE delivery Tuesday, December 28 if you spend $25 on items shipped by Amazon",
          "Or fastest delivery Thursday, December 23. Order within 5 hrs 24 mins",
          "Arrives before Christmas"
        ],
        "department": None,
        "description": None,
        "discount": None,
        "domain": "www.amazon.com",
        "features": [],
        "final_price": 689,
        "format": [
          {
            "name": "Kindle",
            "price": "$0.99",
            "url": "/Wuthering-Heights-Emily-Bronte-ebook/dp/B001C5L5V0"
          },
          {
            "name": "Audiobook",
            "price": "Audiobook $0.00",
            "url": "/Wuthering-Heights-Trout-Lake-Media/dp/B0099S8TKM"
          },
          {
            "name": "Hardcover",
            "price": "$10.99",
            "url": "/Wuthering-Heights-Chartwell-Classics-Bronte/dp/0785839844"
          },
          {
            "name": "Mass Market Paperback",
            "price": "$4.95",
            "url": "/Wuthering-Heights-Bantam-Classics-Bront%C3%AB/dp/0553212583"
          },
          {
            "name": "MP3 CD",
            "price": "$9.99",
            "url": "/Wuthering-Heights-Classic-Collection-Bronte/dp/149158677X"
          },
          {
            "name": "Flexibound",
            "price": "$8.59",
            "url": "/Wuthering-Heights-Word-Cloud-Classics/dp/1684122880"
          }
        ],
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/41k1JwQ6zVL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
        "images_count": "4",
        "initial_price": None,
        "item_weight": "7.8 ounces",
        "manufacturer": None,
        "model_number": None,
        "plus_content": False,
        "product_dimensions": "1 x 4.3 x 7 inches",
        "rating": 3.6,
        "reviews_count": 13451,
        "root_bs_rank": 253400,
        "seller_id": "ATVPDKIKX0DER",
        "seller_name": "Amazon",
        "timestamp": "2021-12-21T23:35:40.084Z",
        "title": "Wuthering Heights (Collins Classics)",
        "upc": None,
        "url": "https://www.amazon.com/dp/0007350813",
        "video": False,
        "video_count": 0,
        "categories": [
          "Books",
          "Literature & Fiction",
          "Genre Fiction"
        ],
        "best_sellers_rank": [
          {
            "category": "Books / Literature & Fiction / Historical Fiction / Short Stories & Anthologies",
            "rank": 28
          },
          {
            "category": "Books / Literature & Fiction / Historical Fiction / Short Stories & Anthologies / Short Stories",
            "rank": 24
          }
        ]
      },
      {
        "asin": "0007513763",
        "ISBN10": "9780007513765",
        "answered_questions": 0,
        "availability": "In Stock.",
        "brand": "Drew Daywalt",
        "buybox_seller": "VMG Books & Media",
        "currency": "USD",
        "date_first_available": None,
        "delivery": [
          "FREE delivery Tuesday, December 28 if you spend $25 on items shipped by Amazon",
          "Arrives after Christmas. Need a gift sooner? Send an Amazon Gift Card instantly by email or SMS.",
          "FREE delivery Wednesday, December 29 if you spend $25 on items shipped by Amazon",
          "Arrives after Christmas. Need a gift sooner? Send an Amazon Gift Card instantly by email or SMS."
        ],
        "department": None,
        "description": None,
        "discount": None,
        "domain": "www.amazon.com",
        "features": [],
        "final_price": 508,
        "format": [
          {
            "name": "Kindle",
            "price": "$10.99",
            "url": "/Day-Crayons-Quit-Drew-Daywalt-ebook/dp/B00AEBEQW8"
          },
          {
            "name": "Audiobook",
            "price": "Audiobook $0.00",
            "url": "/The-Day-the-Crayons-Quit/dp/B09B8TMHZ3"
          },
          {
            "name": "Hardcover",
            "price": "$9.19",
            "url": "/Day-Crayons-Quit-Drew-Daywalt/dp/0399255370"
          },
          {
            "name": "Board book",
            "price": "$15.93",
            "url": "/Day-Crayons-Quit-Howard-Hughes/dp/0008167826"
          }
        ],
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/51q21jP9MtL._SX218_BO1,204,203,200_QL40_ML2_.jpg",
        "images_count": "2",
        "initial_price": None,
        "item_weight": "8.5 ounces",
        "manufacturer": None,
        "model_number": None,
        "plus_content": False,
        "product_dimensions": "9.92 x 0.24 x 9.88 inches",
        "rating": 2.8,
        "reviews_count": 16628,
        "root_bs_rank": 113569,
        "seller_id": "ATVPDKIKX0DER",
        "seller_name": "VMG Books & Media",
        "timestamp": "2021-12-21T23:23:16.450Z",
        "title": "THE DAYS THE CRAYONS QUIT",
        "upc": None,
        "url": "https://www.amazon.com/dp/0007513763",
        "video": False,
        "video_count": 0,
        "categories": [
          "Books",
          "Children's Books",
          "Literature & Fiction"
        ],
        "best_sellers_rank": [
          {
            "category": "Books / Children's Books / Literature & Fiction / Religious Fiction / Christian / Friendship",
            "rank": 42
          }
        ]
      },
      {
        "asin": "0008183988",
        "ISBN10": "0008183988",
        "answered_questions": 0,
        "availability": None,
        "brand": "Bernard Cornwell",
        "buybox_seller": "Reuseaworld",
        "currency": "USD",
        "date_first_available": None,
        "delivery": [
          "FREE delivery January 4 - 10 if you spend $25 on items shipped by Amazon",
          "Or fastest delivery December 29 - January 8",
          "Arrives after Christmas. Need a gift sooner? Send an Amazon Gift Card instantly by email or SMS.",
          "FREE delivery January 13 - 31. ",
          "Arrives after Christmas. Need a gift sooner? Send an Amazon Gift Card instantly by email or SMS."
        ],
        "department": None,
        "description": None,
        "discount": None,
        "domain": "www.amazon.com",
        "features": [],
        "final_price": 839,
        "format": [
          {
            "name": "Kindle",
            "price": "$11.99",
            "url": "/War-Lord-Novel-Saxon-Tales-ebook/dp/B0853767GV"
          },
          {
            "name": "Audiobook",
            "price": "Audiobook $0.00",
            "url": "/War-Lord-Last-Kingdom-Book/dp/B085W8TJ3F"
          },
          {
            "name": "Hardcover",
            "price": "$18.29",
            "url": "/War-Lord-Novel-Saxon-Tales/dp/0062563297"
          },
          {
            "name": "Audio CD",
            "price": "$39.99",
            "url": "/War-Lord-CD-Novel-Saxon/dp/0063052520"
          }
        ],
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/51n75dtKIPL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
        "images_count": "6",
        "initial_price": None,
        "item_weight": "12.3 ounces",
        "manufacturer": None,
        "model_number": None,
        "plus_content": False,
        "product_dimensions": "5.08 x 1.18 x 7.8 inches",
        "rating": 4.2,
        "reviews_count": 11275,
        "root_bs_rank": 26233,
        "seller_id": "ATVPDKIKX0DER",
        "seller_name": "Reuseaworld",
        "timestamp": "2021-12-21T23:23:19.996Z",
        "title": "War Lord: Book 13 (The Last Kingdom Series)",
        "upc": None,
        "url": "https://www.amazon.com/dp/0008183988",
        "video": False,
        "video_count": 0,
        "categories": [
          "Books",
          "Literature & Fiction",
          "Genre Fiction"
        ],
        "best_sellers_rank": [
          {
            "category": "Books / Literature & Fiction / Historical Fiction / Military",
            "rank": 70
          }
        ]
      },
      {
        "asin": "0008305838",
        "ISBN10": "0008305838",
        "answered_questions": 0,
        "availability": "In Stock.",
        "brand": "David Walliams",
        "buybox_seller": "Bahamut Media",
        "currency": "USD",
        "date_first_available": None,
        "delivery": [
          "FREE delivery Tuesday, December 28 if you spend $25 on items shipped by Amazon",
          "Arrives after Christmas. Need a gift sooner? Send an Amazon Gift Card instantly by email or SMS.",
          "FREE delivery January 7 - 25. ",
          "Arrives after Christmas. Need a gift sooner? Send an Amazon Gift Card instantly by email or SMS."
        ],
        "department": None,
        "description": None,
        "discount": None,
        "domain": "www.amazon.com",
        "features": [],
        "final_price": 1043,
        "format": [
          {
            "name": "Paperback",
            "price": "$24.78",
            "url": "/PRE-ORDER-Code-Bananas-David-Walliams/dp/0008454299"
          },
          {
            "name": "Audio CD",
            "price": "$17.00",
            "url": "/Code-Name-Bananas/dp/0008454310"
          }
        ],
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/513FzT0YbIL._SY291_BO1,204,203,200_QL40_ML2_.jpg",
        "images_count": "4",
        "initial_price": None,
        "item_weight": "1.28 pounds",
        "manufacturer": None,
        "model_number": None,
        "plus_content": False,
        "product_dimensions": "5.55 x 1.61 x 8.74 inches",
        "rating": 1.8,
        "reviews_count": 15520,
        "root_bs_rank": 110841,
        "seller_id": "ATVPDKIKX0DER",
        "seller_name": "Bahamut Media",
        "timestamp": "2021-12-21T23:23:17.540Z",
        "title": "Code Name Bananas: The hilarious and epic new children’s book from multi-million bestselling author David Walliams",
        "upc": None,
        "url": "https://www.amazon.com/dp/0008305838",
        "video": False,
        "video_count": 0,
        "categories": [
          "Books",
          "Children's Books",
          "Literature & Fiction"
        ],
        "best_sellers_rank": [
          {
            "category": "Books / Children's Books / Literature & Fiction / Historical Fiction / Military & Wars",
            "rank": 99
          }
        ]
      },
      {
        "asin": "0008375526",
        "ISBN10": "0008375526",
        "answered_questions": 0,
        "availability": "In Stock.",
        "brand": "Caroline Hirons",
        "buybox_seller": "KathrynAshleyGallery",
        "currency": "USD",
        "date_first_available": None,
        "delivery": [
          "FREE delivery Tuesday, December 28",
          "Or fastest delivery Thursday, December 23. Order within 6 hrs 24 mins",
          "Arrives before Christmas",
          "FREE delivery Thursday, December 30 if you spend $25 on items shipped by Amazon",
          "Arrives after Christmas. Need a gift sooner? Send an Amazon Gift Card instantly by email or SMS."
        ],
        "department": None,
        "description": None,
        "discount": None,
        "domain": "www.amazon.com",
        "features": [],
        "final_price": 1499,
        "format": [
          {
            "name": "Kindle",
            "price": "$16.99",
            "url": "/Skincare-ultimate-no-nonsense-Caroline-Hirons-ebook/dp/B07X28571F"
          },
          {
            "name": "Audiobook",
            "price": "Audiobook $0.00",
            "url": "/skinCARE-The-Ultimate-No-Nonsense-Guide/dp/B07X8K9TW5"
          },
          {
            "name": "Digital",
            "price": "",
            "url": "/skinCARE-ultimate-no-nonsense-Caroline-Hirons/dp/0007981147"
          }
        ],
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/51agrdZp2BS._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
        "images_count": "7",
        "initial_price": None,
        "item_weight": "2.31 pounds",
        "manufacturer": None,
        "model_number": None,
        "plus_content": False,
        "product_dimensions": "7.48 x 1 x 9.49 inches",
        "rating": 2.2,
        "reviews_count": 10884,
        "root_bs_rank": 41101,
        "seller_id": "ATVPDKIKX0DER",
        "seller_name": "KathrynAshleyGallery",
        "timestamp": "2021-12-21T23:35:39.675Z",
        "title": "Skincare: The award-winning ultimate no-nonsense guide and Sunday Times No. 1 best-seller",
        "upc": None,
        "url": "https://www.amazon.com/dp/0008375526",
        "video": False,
        "video_count": 0,
        "categories": [
          "Books",
          "Crafts, Hobbies & Home",
          "Home Improvement & Design"
        ],
        "best_sellers_rank": [
          {
            "category": "Books / Health, Fitness & Dieting / Beauty, Grooming, & Style",
            "rank": 57
          },
          {
            "category": "Books / Health, Fitness & Dieting / Aging / Beauty, Grooming & Style",
            "rank": 3
          },
          {
            "category": "Books / Health, Fitness & Dieting / Aging / Medical Conditions & Diseases",
            "rank": 11
          },
          {
            "category": "Books / Health, Fitness & Dieting / Diseases & Physical Ailments / Skin Ailments",
            "rank": 9
          },
          {
            "category": "Books / Health, Fitness & Dieting / Women's Health / General",
            "rank": 82
          }
        ]
      },
      {
        "asin": "0008387753",
        "ISBN10": "0008387753",
        "answered_questions": 0,
        "availability": "Only 13 left in stock - order soon.",
        "brand": "J. R. R. Tolkien",
        "buybox_seller": "Basi6 International",
        "currency": "USD",
        "date_first_available": None,
        "delivery": [
          "FREE delivery January 3 - 7. ",
          "Or fastest delivery December 29 - January 4. ",
          "Arrives after Christmas. Need a gift sooner? Send an Amazon Gift Card instantly by email or SMS."
        ],
        "department": None,
        "description": None,
        "discount": 18.87,
        "domain": "www.amazon.com",
        "features": [],
        "final_price": 412,
        "format": [
          {
            "name": "Vinyl Bound",
            "price": "$27.91",
            "url": "/Hobbit-Lord-Rings-Deluxe-Pocket/dp/0544445783"
          },
          {
            "name": "Mass Market Paperback",
            "price": "$14.74",
            "url": "/J-R-R-Tolkien-4-Book-Boxed-Set/dp/0345538374"
          },
          {
            "name": "Audio CD",
            "price": "$138.54",
            "url": "/Lord-Rings-Hobbit-J-R-R-Tolkien/dp/144586150X"
          }
        ],
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/51iy3eo8+KL._SY344_BO1,204,203,200_.jpg",
        "images_count": 1,
        "initial_price": 59.99,
        "item_weight": "2.56 pounds",
        "manufacturer": None,
        "model_number": None,
        "plus_content": False,
        "product_dimensions": "5.08 x 4.09 x 7.8 inches",
        "rating": 3.3,
        "reviews_count": 20453,
        "root_bs_rank": 99974,
        "seller_id": "AZOLNCI5GS0EX",
        "seller_name": "Basi6 InternationalBasi6 International",
        "timestamp": "2021-12-21T23:23:19.408Z",
        "title": "The Hobbit & The Lord of the Rings Boxed Set",
        "upc": None,
        "url": "https://www.amazon.com/dp/0008387753",
        "video": False,
        "video_count": 0,
        "categories": [
          "Books",
          "Literature & Fiction",
          "Mythology & Folk Tales"
        ],
        "best_sellers_rank": [
          {
            "category": "Books / Literature & Fiction / Mythology & Folk Tales / Fairy Tales",
            "rank": 45
          }
        ]
      },
      {
        "asin": "0008433941",
        "ISBN10": "0008433941",
        "answered_questions": 0,
        "availability": "Usually ships within 6 to 10 days.",
        "brand": "J. R. R. Tolkien",
        "buybox_seller": "tabletopart",
        "currency": "USD",
        "date_first_available": None,
        "delivery": [
          "$3.99 delivery January 12 - 24. ",
          "Arrives after Christmas. Need a gift sooner? Send an Amazon Gift Card instantly by email or SMS."
        ],
        "department": None,
        "description": None,
        "discount": None,
        "domain": "www.amazon.com",
        "features": [],
        "final_price": 361,
        "format": [
          {
            "name": "Kindle",
            "price": "$0.00",
            "url": "/Silmarillion-J-R-R-Tolkien-ebook/dp/B007978PGI"
          },
          {
            "name": "Audiobook",
            "price": "Audiobook $0.00",
            "url": "/The-Silmarillion-J-R-R-Tolkien-audiobook/dp/B016N9U37Q"
          },
          {
            "name": "Paperback",
            "price": "$15.49",
            "url": "/Silmarillion-J-R-R-Tolkien/dp/0544338014"
          },
          {
            "name": "Mass Market Paperback",
            "price": "$8.29",
            "url": "/Silmarillion-J-R-R-Tolkien/dp/0345325818"
          },
          {
            "name": "Audio CD",
            "price": "$48.40",
            "url": "/Silmarillion-J-R-Tolkien/dp/0553456067"
          }
        ],
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/51KZEkcVYML._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
        "images_count": "13",
        "initial_price": None,
        "item_weight": "2.4 pounds",
        "manufacturer": None,
        "model_number": None,
        "plus_content": False,
        "product_dimensions": "5.87 x 1.73 x 8.98 inches",
        "rating": 2.7,
        "reviews_count": 10261,
        "root_bs_rank": 118712,
        "seller_id": "A30UH7RV1UCIV3",
        "seller_name": "tabletoparttabletopart",
        "timestamp": "2021-12-21T23:23:19.359Z",
        "title": "The Silmarillion",
        "upc": None,
        "url": "https://www.amazon.com/dp/0008433941",
        "video": False,
        "video_count": 0,
        "categories": [
          "Books",
          "Literature & Fiction",
          "Genre Fiction"
        ],
        "best_sellers_rank": [
          {
            "category": "Books / Literature & Fiction / Mythology & Folk Tales / Fairy Tales",
            "rank": 60
          }
        ]
      },
      {
        "asin": "0060244887",
        "ISBN10": "0060244887",
        "answered_questions": 0,
        "availability": "Only 12 left in stock - order soon.",
        "brand": "C. S. Lewis",
        "currency": "USD",
        "date_first_available": None,
        "delivery": [
          "FREE delivery Tuesday, December 28",
          "Arrives after Christmas. Need a gift sooner? Send an Amazon Gift Card instantly by email or SMS."
        ],
        "department": None,
        "description": None,
        "discount": 66.01,
        "domain": "www.amazon.com",
        "features": [],
        "final_price": 1399,
        "format": [
          {
            "name": "Kindle",
            "price": "$29.99",
            "url": "/Chronicles-Narnia-Complete-7-Book-Collection-ebook/dp/B008LUYSAE"
          },
          {
            "name": "Audiobook",
            "price": "Audiobook $0.00",
            "url": "/Chronicles-Narnia-Adult-Box-Set/dp/B0835YQDTQ"
          },
          {
            "name": "Paperback",
            "price": "$20.33",
            "url": "/Chronicles-Narnia-Box-Set-Lewis/dp/0061992887"
          },
          {
            "name": "Mass Market Paperback",
            "price": "$29.99",
            "url": "/Chronicles-Narnia-U-K-Box-Set/dp/0007753128"
          },
          {
            "name": "Audio CD",
            "price": "$56.98",
            "url": "/Complete-Chronicles-Narnia-Box-Set/dp/0060793260"
          },
          {
            "name": "Multimedia CD",
            "price": "",
            "url": "/Chronicles-Collectors-COLLECTORS-UNABRIDGED-Compact/dp/B00QMODSVG"
          }
        ],
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/51YGwxKn3CL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
        "images_count": "2",
        "initial_price": 120,
        "item_weight": "6.3 pounds",
        "manufacturer": None,
        "model_number": None,
        "plus_content": False,
        "product_dimensions": "6.81 x 6.3 x 9.8 inches",
        "rating": 4.8,
        "reviews_count": 11222,
        "root_bs_rank": 3717,
        "seller_id": "ATVPDKIKX0DER",
        "seller_name": "Amazon",
        "timestamp": "2021-12-21T23:35:37.401Z",
        "title": "The Chronicles of Narnia (Box Set)",
        "upc": None,
        "url": "https://www.amazon.com/dp/0060244887",
        "video": False,
        "video_count": 0,
        "categories": [
          "Books",
          "Children's Books",
          "Literature & Fiction"
        ],
        "best_sellers_rank": [
          {
            "category": "Books / Deals in Books",
            "rank": 7
          },
          {
            "category": "Books / Children's Books / Literature & Fiction / Religious Fiction",
            "rank": 31
          },
          {
            "category": "Books / Children's Books / Classics",
            "rank": 92
          },
          {
            "category": "Books / Christian Books & Bibles / Children's & Teens",
            "rank": 59
          },
          {
            "category": "Books / Children's Books / Literature & Fiction / Religious Fiction / Christian",
            "rank": 28
          },
          {
            "category": "Books / Children's Books / Religions / Christianity",
            "rank": 52
          }
        ]
      }
]

# Define a function to clean the data
def clean_book_data(book):
    # Only keep the required fields
    required_fields = ['title', 'author', 'price', 'url', 'rating', 'description', 'image_url', 'categories']
    
    # Filter the book object to only include required fields
    cleaned_book = {key: book.get(key) for key in required_fields}

    # Some fields might need renaming or defaults
    cleaned_book['author'] = book.get('brand', 'Unknown Author')  # Using 'brand' as author
    cleaned_book['price'] = book.get('final_price', 0)  # Using 'final_price' as price
    cleaned_book['description'] = book.get('description', 'No description available')  # Default description

    return cleaned_book

# Your token for authentication
headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI3MjI4ODYxLCJleHAiOjE3MjcyMzI0NjF9.5BZWAMFvCVCk5hHh3FzjDVyuAc4ivVUdoNTi1zc2fq0',
    'Content-Type': 'application/json'
}

# Seed the data
for book in books:
    cleaned_book = clean_book_data(book)
    response = requests.post(url, headers=headers, data=json.dumps(cleaned_book))
    if response.status_code == 201:
        print(f"Added book: {cleaned_book['title']}")
    else:
        print(f"Failed to add book: {cleaned_book['title']} - Status Code: {response.status_code}")
