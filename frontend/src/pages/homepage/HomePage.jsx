// frontend/src/pages/homepage/HomePage.jsx
// import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const HomePage = () => {
    // Replace with actual authorization logic
    const isAuthorized = true; // Example: Set to true or false based on your auth logic

    return (
        <Box p={5}>
            
            <Heading mb={4}>Welcome to Our School</Heading>
            <Text mb={4}>Here you can find the latest news and updates from our school.</Text>

            {/* Example News Section */}
            <Box mb={4} borderWidth="1px" borderRadius="lg" p={3}>
                <Heading size="md">Latest News</Heading>
                <Text>We are excited to announce our upcoming school event!</Text>
                <Text fontSize="sm">Posted on: 12th October 2024</Text>
            </Box>

            {/* Example Blog Section */}
            <Box borderWidth="1px" borderRadius="lg" p={3}>
                <Heading size="md">School Blog</Heading>
                <Text>Check out our latest blog post on improving student engagement.</Text>
                <Text fontSize="sm">Posted on: 11th October 2024</Text>
            </Box>

            {/* Links to Portals */}
            <VStack mt={5} spacing={4}>
                {isAuthorized && (
                    <>
                        {/* <Link to="/staff">
                            <Button colorScheme="teal">Staff Portal</Button>
                        </Link> */}
                        <Link to="/sports">
                            <Button colorScheme="teal">Sports</Button>
                        </Link>
                        <Link to="/login">
                            <Button colorScheme="teal">Login</Button>
                        </Link>
                    </>
                )}
                {!isAuthorized && (
                    <Text>You must be logged in to access the portals.</Text>
                )}
            </VStack>
        </Box>
    );
};

export default HomePage;
