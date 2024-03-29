import RenderCampsite from "../features/campsites/RenderCampsite";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View, Button, Modal } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { Rating, Input } from "react-native-elements";
import { postComment } from "../features/comments/commentsSlice";
import * as Animatable from "react-native-animatable";

const CampsiteInfoScreen = ({ route }) => {
  const { campsite } = route.params;
  const comments = useSelector((state) => state.comments);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const renderCommentItem = ({ item }) => {
    return (
      <View style={styles.commentItem}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Rating
          readonly
          startingValue={item.rating}
          imageSize={10}
          style={{ paddingVertical: "5%", alignItems: "flex-start" }}
        />
        <Text
          style={{ fontSize: 12 }}
        >{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };

  const handleSubmit = () => {
    const newComment = {
      author,
      rating,
      text,
      campsiteId: campsite.id,
    };
    dispatch(postComment(newComment));
    setShowModal(!showModal);
  };

  const resetForm = () => {
    setRating(5);
    setAuthor("");
    setText("");
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <FlatList
        data={comments.commentsArray.filter(
          (comment) => comment.campsiteId === campsite.id
        )}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ marginHorizontal: 20, paddingVertical: 20 }}
        ListHeaderComponent={
          <>
            <RenderCampsite
              campsite={campsite}
              isFavorite={favorites.includes(campsite.id)}
              markFavorite={() => dispatch(toggleFavorite(campsite.id))}
              onShowModal={() => setShowModal(!showModal)}
            />
            <Text style={styles.commentsTitle}>Comments</Text>
          </>
        }
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
      >
        <View style={styles.modal}>
          <Rating
            showRating
            startingValue={rating}
            imageSize={30}
            onFinishRating={(rating) => setRating(rating)}
            style={{ paddingVertical: 10 }}
          ></Rating>
          <Input
            placeholder="Author"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(author) => setAuthor(author)}
            value={author}
          ></Input>
          <Input
            placeholder="Comments"
            leftIcon={{ type: "font-awesome", name: "comment-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(text) => setText(text)}
            value={text}
          ></Input>
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => {
                handleSubmit(!handleSubmit);
                resetForm();
              }}
              color="#5637DD"
              title="Submit"
            ></Button>
          </View>
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => setShowModal(!showModal)}
              color="#808080"
              title="Cancel"
            ></Button>
          </View>
        </View>
      </Modal>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  commentsTitle: {
    textAlign: "center",
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    color: "#43484D",
    padding: 10,
    paddingTop: 30,
  },
  commentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default CampsiteInfoScreen;
