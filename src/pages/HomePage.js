import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Container, ListItem, ListItemText, List, Grid, CardActionArea, CardContent, Card, CardMedia } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

function HomePage() {

    useEffect(() => {
        fetchItems();
    }, []);

    const [cardData, setCardData] = useState([]);

    const fetchItems = async () => {
        let data = await fetch('/api/allitems');
        let itemData = await data.json();
        console.log(itemData);
        setCardData(itemData);
    }

    const useStyles = makeStyles({
        Media: {
            height: 200,
            objectFit: 'cover'
        },
        Card: {
            width: 300
        },
        Title: {
            textDecoration: 'none'
        }
    });

    const classes = useStyles();

    return (
        <Container component="main">
            <Container component="header">
                <Box m={4}>
                    <Typography variant="h2" align="center">
                        Title Heres
                    </Typography>
                </Box>
                <Box m={4}>
                    <Typography component="div" variant="h6" align="center">
                        hey  hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey
    </Typography>
                </Box>
            </Container>
            <Grid container>
                <Grid item>
                    <Box compontent="sidebar">
                        <List>
                            {['Category 1', 'Category 2', 'Category 3', 'Category 4'].map((text) => (
                                <ListItem button key={text}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
                <Grid item>
                    <Box>
                        <Grid container spacing={8}>
                            {cardData.map(card => (
                                <Grid item>
                                    <Card className={classes.Card}>
                                        <Link to={{
                                            pathname: `item/${card.item_id}`,
                                            state: { data: card }
                                        }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.Media}
                                                    component="img"
                                                    src={process.env.PUBLIC_URL + `/media/${card.item_id}` + card.item_main_image_path}
                                                />
                                                <CardContent>
                                                            {card.item_title}
                                                </CardContent>
                                            </CardActionArea>
                                        </Link>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>

    );
}

export default HomePage;
