import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost, removePost } from '../redux/slices/PostsSlice';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import NewsLetter from '../components/NewsLetter';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../helpers/Responsive';
import { useRoute } from '@react-navigation/native';
// import TextInput from '../components/TextInput';


const BlogDetailScreen = () => {
    const [blogUserName, setBlogUserName] = useState('');
    const [blogUserEmail, setBlogUserEmail] = useState('');
    const [blogUserMsg, setBlogUserMsg] = useState('');
    const route = useRoute();
    const { blogData, articleData } = route.params;


    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = () => {
        if (!validateEmail(blogUserEmail)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        // Proceed with your submission logic here
        // console.log('Submitted email:', email);
    };


    return (
        <ScrollView style={styles.container}>
            {/* <CustomHeader /> */}
            <View style={styles.mainHeadingView}>
                <Text style={styles.mainHeadingText}>{blogData.title}</Text>
            </View>
            <Image style={styles.blogMainImg} source={{ uri: articleData.image.src }} />

            <View style={styles.blogDetailMain}>
                <View style={styles.startMain}>
                    <Text style={styles.startText}>
                        Getting Started
                    </Text>
                    <Text style={styles.readTimeText}>
                        6 Min Read
                    </Text>
                </View>

                <View style={styles.descriptionMain}>
                    <Text style={styles.productHeading}>{articleData.title}</Text>
                    <Text style={styles.productDescription}>{articleData.content}</Text>

                    {/* <Text style={styles.productHeading1}>PERFUME MYTH 1: SILLAGE SHOCK: THE BIGGER, THE BETTER?</Text>
                    <Text style={styles.productDescription}>First things first, this ol' sillage saga! You've heard it before - the louder the scent cloud, the fancier the fragrance. But the fact is that quality isn't about making your presence known in the next town. It's about leaving just a hint of elegance.{"\n"}{"\n"}

                        Think about it, do you want to be remembered
                        as the perfumigator of an olfactory explosion?
                        Definitely no! So, balance is the real game-
                        changer here.</Text>

                    <Text style={styles.productHeading1}>PERFUME MYTH 2: SPRAYATHON FOR THE WIN—OR NOT?</Text>
                    <Text style={styles.productDescription}>We know that you adore your perfume. But trust
                        us, making it rain with spritzes won't make it last
                        longer. You're not watering a plant; you're wearing
                        a fragrance. So, apply strategically! A dab here, a
                        dab there, and you're the fragrance maestro.
                        Less can indeed be more—for your nose and for
                        the noses around you.</Text>

                    <Image style={styles.mythImg} source={require('../../assets/mythImg.png')} />

                    <Text style={styles.productHeading1}>PERFUME MYTH 4: ONE SCENT TO RULE THEM ALL—REALLY?</Text>
                    <Text style={styles.productDescription}>Sure, having a signature scent sounds posh, but life's too short for just one fragrance. You wouldn't wear the same outfit every day, right? Scents are the same. Why settle for vanilla when you can savor a buffet of aromas? Match your mood, the occasion, or even the weather. Mix it up, and let your nose live a little!</Text>

                    <Text style={styles.productHeading1}>PERFUME MYTH 5: RUB-A-DUB, OOPS! PERFUME APPLICATION FAUX PAS</Text>
                    <Text style={styles.productDescription}>Imagine this: You've just bought your favorite fragrance, and then you rub it between your hands. Well, that's not going to increase your perfume’s lasting.{"\n"}{"\n"}Don't rough up your scent! Spray and let it play. It knows what it’s doing. Apply it to pulse points and let it bloom. It’s not a genie; you don't need to rub it for your wish to come true.</Text>

                    <Image style={styles.mythImg} source={require('../../assets/diorImg.png')} /> */}

                </View>

                <Text style={styles.writtenByText}>WRITTEN BY STANISLAS PICHUTKA</Text>

                <View style={styles.shareLinkMain}>
                    <Text style={styles.shareLinkText}>Share this blog:</Text>
                    <View style={styles.socialMediaIcons}>
                        <TouchableOpacity>
                            <Image style={styles.linkIcon} source={require('../../assets/facebook.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image style={styles.linkIcon} source={require('../../assets/instagram.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image style={styles.linkIcon} source={require('../../assets/linkedin.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.blogFormMain}>
                    <Text style={styles.productHeading}>LEAVE A COMMENT</Text>
                    <TextInput
                        value={blogUserName}
                        onChangeText={setBlogUserName}
                        placeholder="Name"
                        style={styles.inputStyle}
                    />

                    <TextInput
                        placeholder="Email"
                        onChangeText={setBlogUserEmail}
                        value={blogUserEmail}
                        style={styles.inputStyle}
                    />

                    <TextInput
                        multiline
                        value={blogUserMsg}
                        onChangeText={setBlogUserMsg}
                        placeholder="Message"
                        style={styles.inputStyle1}
                    />

                    <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
                        <Text style={styles.submitBtnText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <NewsLetter newsStyle={styles.childContainer} />
            <Footer footerStyle={styles.childContainer} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    mainHeadingView: {
        backgroundColor: '#000000',
        paddingLeft: wp(4),
        paddingTop: hp(5),
        justifyContent: 'flex-start',
    },
    mainHeadingText: {
        color: '#ffffff',
        fontFamily: 'Montserrat',
        fontWeight: '200',
        fontSize: wp(7),
        lineHeight: hp(4)
    },
    blogMainImg: {
        resizeMode: 'cover',
        width: '100%',
        height: hp(36),
        alignSelf: 'center'
    },
    mythImg: {
        // resizeMode: 'contain',
        width: wp(80),
        height: hp(25),
        alignSelf: 'center'
    },
    blogDetailMain: {
        width: '90%',
        alignSelf: 'center',
        shadowOffset: { width: -0.5, height: 1 },
        shadowColor: '#000',
        shadowOpacity: 0.5,
        // height: hp(100),
        marginTop: hp(-5),
        marginBottom: hp(5),
        backgroundColor: '#fff',
        paddingLeft: wp(4),
        paddingRight: wp(4),
    },
    startMain: {
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: hp(2)
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
    productHeading1: {
        fontFamily: 'Montserrat',
        fontSize: wp(6),
        fontWeight: '400',
        marginBottom: hp(2),
        color: '#000000',
        marginTop: hp(2),
    },
    writtenByText: {
        fontSize: wp(3.5),
        fontFamily: 'Montserrat',
        color: '#000',
        fontWeight: '400',
        marginTop: hp(2)
    },
    shareLinkMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(2)
    },
    shareLinkText: {
        fontSize: wp(5),
        fontWeight: '400',
        color: '#000',
        fontFamily: 'Montserrat'
    },
    socialMediaIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    linkIcon: {
        width: wp(4),
        height: hp(2),
        marginLeft: wp(8),
        resizeMode: 'contain'
    },
    blogFormMain: {
        marginTop: hp(2),
        justifyContent: 'flex-start',
    },
    inputStyle: {
        borderWidth: wp(0.2),
        borderColor: '#BBB5B5',
        width: '100%',
        paddingRight: wp(3),
        paddingLeft: wp(3),
        paddingTop: hp(1),
        paddingBottom: hp(1),
        marginBottom: hp(2)
    },
    inputStyle1: {
        borderWidth: wp(0.2),
        borderColor: '#BBB5B5',
        width: '100%',
        paddingRight: wp(3),
        paddingLeft: wp(3),
        paddingTop: hp(1),
        paddingBottom: hp(1),
        marginBottom: hp(2),
        height: hp(16),
        textAlignVertical: 'top'
    },
    submitBtn: {
        width: '100%',
        backgroundColor: '#000',
        height: hp(7),
        marginBottom: hp(5),
        justifyContent: 'center'
    },
    submitBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '400',
        fontFamily: 'Montserrat',
        fontSize: wp(6)
    }

});

export default BlogDetailScreen