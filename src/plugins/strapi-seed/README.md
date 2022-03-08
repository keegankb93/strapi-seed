# Strapi plugin strapi-seed

Quickly seed your data via JSON files.

Create inside of Strapi admin or copy and paste from your favorite code editor.

Does not support yet:

Components
Dynamic zones
Images from computer (Does support an array of image URLs!)


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
  "customer":
    "firstName": "John",
    "lastName": "Smith",
    "email": "jsmith@example.com",
    "profilePicture: { images: ["https://aws.johnsmithprofilepic.png"] },
    "products: { relations: ["gym_subscription", "weekly_food_delivery_service"] } 

}
```

- The related collection must already be created and at the moment can only be linked via a 'name' field. This will change later and be choosable.
- Images can only be a URL at this time. 
