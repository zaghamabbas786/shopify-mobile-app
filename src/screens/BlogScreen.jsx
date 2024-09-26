import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost, removePost } from '../redux/slices/PostsSlice';
import Button from '../components/Button';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../helpers/Responsive';
import apiClient from '../api/apiClient';
import { useNavigation } from '@react-navigation/native';

const graphqlQuery = `query MyQuery {
    blogs(first: 10) {
        edges {
          node {
            title
            id
            articles(first: 10) {
              edges {
                node {
                  title
                  image {
                    src
                  }
                  content
                  id
                  tags
                }
              }
            }
          }
        }
      }
  }`;

export default function BlogScreen() {
    const [filters, setFilters] = useState('all');
    const [blogData, setBlogData] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await apiClient.post('', { query: graphqlQuery });
                if (response.data && response.data.data && response.data.data.blogs) {
                    setBlogData(response.data.data.blogs.edges);
                    setLoading(false); // Set loading to false when data is fetched

                    // Select the first tag by default
                    if (response.data.data.blogs.edges.length > 0) {
                        const firstBlog = response.data.data.blogs.edges[0];
                        if (firstBlog.node.articles.edges.length > 0) {
                            const firstArticle = firstBlog.node.articles.edges[0].node;
                            if (firstArticle.tags.length > 0) {
                                setSelectedTag(firstArticle.tags[0]);
                            }
                        }
                    }
                } else {
                    console.error('Invalid API response:', response);
                    setLoading(false); // Set loading to false in case of error
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchBlogData();
    }, []);


    // Extracting all unique tags from the blog data
    const allTags = [...new Set(blogData.flatMap(blog =>
        blog.node.articles.edges.flatMap(article => article.node.tags)))].sort((a, b) => a.localeCompare(b));

    // Function to handle "Read More" button click
    const handleReadMore = (blogData, articleData) => {
        // Navigate to the next screen with article data as route params
        navigation.navigate('BlogDetailScreen', { blogData, articleData });
    };

    if (loading) {
        return <Text style={{ textAlign: 'center' }}>Loading...</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            {/* <CustomHeader /> */}
            {blogData.slice(0, 1).map(blog => (
                <View key={blog.node.id}>
                    <View style={styles.headingMain}>
                        <Text style={styles.headingText}>{blog.node.title}</Text>
                        <Text style={styles.headingDescription}>Discover the latest news, tips and user research
                            insights from Denver. You’ll learn about Perfume’s,
                            cologne and Deodrant’s best practices.</Text>
                    </View>
                    {blog.node.articles.edges.map(article => (
                        <View style={styles.mainBlogContainer} key={article.node.id}>
                            <Image style={styles.blogMainImg} source={{ uri: article.node.image.src }} />


                            <View style={styles.startMain}>
                                <Text style={styles.startText}>
                                    Getting Started
                                </Text>
                                <Text style={styles.readTimeText}>
                                    6 Min Read
                                </Text>
                            </View>

                            <View style={styles.descriptionMain}>
                                <Text style={styles.productHeading}>{article.node.title}</Text>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={styles.productDescription}>{article.node.content}</Text>
                            </View>

                            <TouchableOpacity style={styles.readMoreBtn} onPress={() => handleReadMore(blog.node, article.node)}>
                                <Text style={styles.readMoreText}>
                                    Read More
                                </Text>
                                <Image style={styles.arrowImg} source={require('../../assets/arrow-right.png')} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            ))}
            <Image style={styles.ellipseImg} source={require('../../assets/Ellipse.png')} />



            <View style={styles.filtersMainContainer}>
                <Text style={styles.productHeading}>
                    Latest Articles
                </Text>

                <View style={styles.filterBtnMain}>
                    {allTags.map(tag => (
                        <TouchableOpacity key={tag} style={selectedTag === tag ? styles.activeFilterBtn : styles.InActiveFilterBtn} onPress={() => setSelectedTag(tag)}>
                            <Text style={selectedTag === tag ? styles.activeFilterBtnText : styles.InActiveFilterBtnText}>{tag}</Text>
                        </TouchableOpacity>
                    ))}
                </View>


            </View>

            {blogData.map(blog => (
                <View key={blog.node.id}>
                    {blog.node.articles.edges.filter(article => selectedTag ? article.node.tags.includes(selectedTag) : true).map(article => (
                        <View style={styles.mainBlogContainer} key={article.node.id}>
                            <Image style={styles.blogMainImg} source={{ uri: article.node.image.src }} />


                            <View style={styles.startMain}>
                                <Text style={styles.startText}>
                                    Getting Started
                                </Text>
                                <Text style={styles.readTimeText}>
                                    6 Min Read
                                </Text>
                            </View>

                            <View style={styles.descriptionMain}>
                                <Text style={styles.productHeading}>{article.node.title}</Text>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={styles.productDescription}>{article.node.content}</Text>
                            </View>

                            <TouchableOpacity style={styles.readMoreBtn} onPress={() => handleReadMore(blog.node, article.node)}>
                                <Text style={styles.readMoreText}>
                                    Read More
                                </Text>
                                <Image style={styles.arrowImg} source={require('../../assets/arrow-right.png')} />
                            </TouchableOpacity>

                        </View>
                    ))}
                </View>

            ))}

            <Footer footerStyle={styles.childContainer} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    headingMain: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: hp(8),
        width: '90%',
        alignSelf: 'center'
    },
    headingText: {
        fontFamily: 'Montserrat',
        fontSize: wp(7),
        fontWeight: '400',
        marginBottom: hp(3),
        color: '#000000',
    },
    headingDescription: {
        textAlign: 'center',
        fontSize: wp(3.5),
        color: '#777777',
        fontFamily: 'Montserrat',
        marginBottom: hp(3),
    },
    mainBlogContainer: {
        width: '100%',
    },
    blogMainImg: {
        resizeMode: 'contain',
        height: hp(26),
        width: wp(90),
        alignSelf: 'center'
    },
    startMain: {
        justifyContent: 'space-between',
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: hp(2),
    },
    startText: {
        color: '#D89471',
        fontSize: wp(3.5),
        fontWeight: '700',
        fontFamily: 'Montserrat',
        textTransform: 'uppercase'
    },
    readTimeText: {
        color: '#777777',
        fontSize: wp(3.5),
        fontWeight: '400',
        fontFamily: 'Montserrat',
    },
    descriptionMain: {
        width: '90%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'center'
    },
    productHeading: {
        fontFamily: 'Montserrat',
        fontSize: wp(7),
        fontWeight: '400',
        marginBottom: hp(2),
        color: '#000000',
        marginTop: hp(2),
    },
    productDescription: {
        textAlign: 'left',
        fontSize: wp(3.5),
        color: '#777777',
        fontFamily: 'Montserrat',
        marginBottom: hp(3),
    },
    readMoreBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginBottom: hp(3),
    },
    arrowImg: {
        width: wp(3),
        height: hp(3)
    },
    readMoreText: {
        color: '#000000',
        fontSize: wp(3),
        fontWeight: '700',
        fontFamily: 'Montserrat',
        textTransform: 'capitalize',
        marginRight: wp(2)
    },
    ellipseImg: {
        width: '90%',
        height: hp(0.2),
        alignSelf: 'center',
        marginBottom: hp(3)
    },
    filtersMainContainer: {
        width: '90%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'center'
    },
    filterBtnMain: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    activeFilterBtn: {
        paddingLeft: wp(7),
        paddingRight: wp(7),
        backgroundColor: '#000000',
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(3),
        marginBottom: hp(3)

    },
    activeFilterBtnText: {
        color: '#ffffff',
        fontFamily: 'Montserrat',
        fontSize: wp(4),
        fontWeight: '400',
        textTransform: 'capitalize'
    },
    InActiveFilterBtn: {
        paddingLeft: wp(7),
        paddingRight: wp(7),
        backgroundColor: '#BBB5B5',
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(3),
        marginBottom: hp(3),
    },
    InActiveFilterBtnText: {
        color: '#000000',
        fontFamily: 'Montserrat',
        fontSize: wp(4),
        fontWeight: '400',
        textTransform: 'capitalize'
    }

});
