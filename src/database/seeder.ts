import User from "./models/user";
import Photo from "./models/photo";
import Comment from "./models/comment";
import { UserService } from "../services/userService";
import { MailConfig } from "../config/emailConfig";

export default class Seeder {
    static userService = new UserService(new MailConfig());

    public static async seed() {
        await Seeder.seedUsers();
        await Seeder.seedPhotos();

        console.log('Data seeding completed.');
    }

    private static async seedUsers() {
        try {
            await this.userService.createUser("admin", "123", true);
            await this.userService.createUser("Ivan", "123", false);
            await this.userService.createUser("Georgi", "123", false);
            await this.userService.createUser("Stefan", "123", false);
        } catch (error) {
            console.error('Error seeding users:', error);
        }
    }

    private static async seedPhotos() {
        try {
            await Photo.create({ 
                userId: 1, 
                title: "Sample Photo",
                description: "This is a sample photo.",
                url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
            });

            await Photo.create({ 
                userId: 2, 
                title: "Leaf",
                description: "Autumn leaf",
                url: "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg"
            });

            await Photo.create({ 
                userId: 2, 
                title: "Lake",
                description: "Beautiful lake",
                url: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            });

            await Photo.create({ 
                userId: 3, 
                title: "Sunset",
                description: "Sunset",
                url: "https://t3.ftcdn.net/jpg/02/70/35/00/360_F_270350073_WO6yQAdptEnAhYKM5GuA9035wbRnVJSr.jpg"
            });

            await Photo.create({ 
                userId: 3, 
                title: "Tiger",
                description: "Tiger in the wild",
                url: "https://kinsta.com/wp-content/uploads/2020/08/tiger-jpg.jpg"
            });

            await Photo.create({ 
                userId: 4, 
                title: "House on the lake",
                description: "House on the lake",
                url: "https://visitwestcork.files.wordpress.com/2014/12/gougane-barra.jpg?w=640&h=435&crop=1"
            });
            console.log('Photos seeded successfully.');
        } catch (error) {
            console.error('Error seeding photos:', error);
        }
    }
}