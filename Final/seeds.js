var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://www.straight.com/files/v3/styles/gs_large/public/images/18/06/gettyimages-649155058.jpg?itok=Lhx5ciAR",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio commodi cupiditate harum voluptates alias debitis tempora perspiciatis porro asperiores deserunt. Vitae molestias corrupti hic qui, iusto iure quaerat doloribus perspiciatis perferendis similique error inventore soluta quisquam ipsam beatae voluptatem mollitia obcaecati aliquid facere itaque, nihil officiis repellendus, aliquam excepturi. Voluptatum reprehenderit distinctio at commodi hic architecto quasi magni, assumenda eos delectus voluptatem dolor ea? Corporis, possimus consequuntur autem quis illo rerum similique earum necessitatibus at nulla dolores eius molestiae recusandae ratione sunt reprehenderit animi sit! Iste pariatur amet inventore velit fuga odio? Vero aut autem quos quasi ipsum quod possimus."
    },
    {
        name: "Desert Mesa",
        image: "https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio commodi cupiditate harum voluptates alias debitis tempora perspiciatis porro asperiores deserunt. Vitae molestias corrupti hic qui, iusto iure quaerat doloribus perspiciatis perferendis similique error inventore soluta quisquam ipsam beatae voluptatem mollitia obcaecati aliquid facere itaque, nihil officiis repellendus, aliquam excepturi. Voluptatum reprehenderit distinctio at commodi hic architecto quasi magni, assumenda eos delectus voluptatem dolor ea? Corporis, possimus consequuntur autem quis illo rerum similique earum necessitatibus at nulla dolores eius molestiae recusandae ratione sunt reprehenderit animi sit! Iste pariatur amet inventore velit fuga odio? Vero aut autem quos quasi ipsum quod possimus."
    },
    {
        name: "Canyon floor",
        image: "https://cdn.muenchen-p.de/.imaging/stk/responsive/image980/dms/lhm/tourismus/camping-l/document/camping-l.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio commodi cupiditate harum voluptates alias debitis tempora perspiciatis porro asperiores deserunt. Vitae molestias corrupti hic qui, iusto iure quaerat doloribus perspiciatis perferendis similique error inventore soluta quisquam ipsam beatae voluptatem mollitia obcaecati aliquid facere itaque, nihil officiis repellendus, aliquam excepturi. Voluptatum reprehenderit distinctio at commodi hic architecto quasi magni, assumenda eos delectus voluptatem dolor ea? Corporis, possimus consequuntur autem quis illo rerum similique earum necessitatibus at nulla dolores eius molestiae recusandae ratione sunt reprehenderit animi sit! Iste pariatur amet inventore velit fuga odio? Vero aut autem quos quasi ipsum quod possimus."
    }
];


function seedDB() {
    Campground.deleteMany({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("removed campgrounds");
            Comment.deleteMany({}, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("removed comments!");
                    data.forEach(function(campground) {
                        Campground.create(campground, function(err, newCampground) {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("Added campground!");
                                Comment.create({
                                    text: "This place is great but I wish there was internet!", 
                                    author: "Homer"
                                }, function(err, comment) {
                                    if(err) {
                                        console.log(err);
                                    } else {
                                    newCampground.comments.push(comment);
                                    newCampground.save();
                                    console.log("Created new comment");
                                    }
                                    
                                });
                            }
                        });
                    });
                }
            });
        }
        
    });
    
} 

module.exports = seedDB;
