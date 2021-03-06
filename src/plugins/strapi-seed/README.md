# Strapi plugin strapi-seed

Quickly seed your data via JSON files.

Create inside of Strapi admin or copy and paste from your favorite code editor.

Does not support yet:

Components
Dynamic zones
Images from computer (Does support an array of image URLs!)

## Installation

`yarn add strapi-seed`

Ignore any files that are created in the seed folder, so that your server doesn't restart when seeding.

`watchIgnoreFiles: ["**/seeds/**"],`

Enable it in your plugins.js file

```
"strapi-seed": {
  enabled: true
}
```

## Usage

```
{
  "modelname":
    "field": "value",
}
```

## Example

```
{
  "customer": [
    "firstName": "John",
    "lastName": "Smith",
    "email": "jsmith@example.com",
    "profilePicture: { images: ["https://aws.johnsmithprofilepic.png"] },
    "products: { relations: ["gym_subscription", "weekly_food_delivery_service"] }
    ]

}
```

Each file is an array of collection items. In this case an array of JSON objects for the model customer.

- The related collection must already be created and at the moment can only be linked via a 'name' field. This will change later and be choosable.
- Images can only be a URL at this time.

If you want to quickstart your JSON file, navigate to strapi-seed in admin and select the model you want to create items for and copy the template that populates. :)
