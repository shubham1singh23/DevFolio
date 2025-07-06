import mongoose from 'mongoose';
import Project from './models/Project.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const updateProjectPositions = async () => {
  try {
    console.log('Updating project positions...');

    // Get all projects ordered by creation date
    const projects = await Project.find().sort({ createdAt: 1 });

    // Update each project with a position
    for (let i = 0; i < projects.length; i++) {
      await Project.findByIdAndUpdate(projects[i]._id, { position: i });
      console.log(`Updated ${projects[i].title} with position ${i}`);
    }

    console.log(`Successfully updated ${projects.length} projects with positions`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating project positions:', error);
    process.exit(1);
  }
};

updateProjectPositions(); 