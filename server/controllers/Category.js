const { Category } = require( "../models/Category");



exports. createCategory=async (req,res)=>{
	
   try{
    const {name,description}=req.body;
    if(!name || ! description){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    const CategorysDetails = await Category.create({
		name: name,
		description: description,
	});

    return res.status(200).json({
        success:true,
        message:"Category created successfully"
    })
   }
   catch(e){
    return res.status(500).json({
        success:false,
        message:e.message
    })
   }
}

// to get all Categories

exports. showAllCategories=async (req,res)=>{
    try{
        const allCategories=await Category.find({});
        return res.status(200).json({
            success:true,
            allCategories
        })
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

exports. categoryPageDetails = async (req, res) => {
	try {
		const { categoryId } = req.body;

		// Get courses for the specified category
		const selectedCategory = await Category.findById(categoryId)
			.populate("course")
			.exec();
		console.log(selectedCategory);
		// Handle the case when the category is not found
		if (!selectedCategory) {
			console.log("Category not found.");
			return res
				.status(404)
				.json({ success: false, message: "Category not found" });
		}
		// Handle the case when there are no courses
		if (selectedCategory.course.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}

		const selectedCourses = selectedCategory.course;

		// Get courses for other categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		}).populate("course").exec();
		let differentCourses = [];
		for (const category of categoriesExceptSelected) {
			differentCourses.push(...category.course);
		}

		// Get top-selling courses across all categories
		const allCategories = await Category.find().populate("course");
		const allCourses = allCategories.flatMap((category) => category.course);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
			.slice(0, 10);

		res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses: mostSellingCourses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};