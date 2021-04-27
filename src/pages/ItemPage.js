import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from '@material-ui/core';
import { Box, Container, Typography, Grid, Divider } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@material-ui/core/styles';


function ItemPage({ match }) {

    useEffect(() => {
        fetchItem();
        fetchImages();
    }, []);

    const itemId = match.params.id;

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [amount, setAmount] = useState(0);
    const [cardData, setCardData] = useState([]);
    const [imagesData, setImagesData] = useState([]);
    const [isReady, setIsReady] = useState(true);

    const fetchItem = async () => {
        let data = await fetch(`/api/item/${itemId}`);
        let itemData = await data.json();
        setCardData(itemData[0]);
    }

    const fetchImages = async () => {
        let data = await fetch(`/api/images/${itemId}`);
        let imagesgetData = await data.json();
        setImagesData(imagesgetData);
    }

    const data = {
        bidder_name: name,
        bidder_contact_info: contact,
        bid_item_id: cardData.item_id,
        bid_price: parseFloat(amount)
    }

    const addBid = () => {
        console.log("data from addbid", JSON.stringify(data));
        fetch('/api/post/bid', {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(function (response) {
                console.log(response);
                return response.json();
            }).catch(error => {
                console.log(error)
            })
    }

    const handleSubmit = (e) => {
        console.log("Break");
        console.log(data, "submit data");
        addBid();
    }

    const updateAmount = async (value) => {
        setAmount(value);
        setIsReady(name === "" || amount === 0 || contact === "");
    }
    const updateContact = async (value) => {
        setContact(value);
        setIsReady(name === "" || amount === 0 || contact === "");
    }
    const updateName = async (value) => {
        setName(value);
        setIsReady(name === "" || amount === 0 || contact === "");
    }

    const test = (e) => {
        e.preventDefault();
        console.log("NAME", name);
        console.log("AMOUNT", amount);
        console.log("CONTACT", contact);
        console.log("IS READY?", isReady);
        console.log(cardData, "cardData");
        console.log(imagesData, "imagesData");
    }

    const useStyles = makeStyles({
        Media: {
            height: 200,
            objectFit: 'cover',
            alignItems: 'center',
        }
    });
    const classes = useStyles();

    return (
        <div>
            <Container component="header">
                <Box m={4}>
                    <Typography variant="h2" align="center">
                        {cardData.item_title}
                    </Typography>
                </Box>
            </Container>
            <Container maxWidth='sm'>
                <Carousel
                    interval={30000}
                    changeOnFirstRender={false}>
                    {
                        imagesData.map(imageData =>
                            <Grid container justify='center' alignItems='center'>
                                <Grid item >
                                    <img
                                        alt={cardData.item_title}
                                        className={classes.Media}
                                        src={process.env.PUBLIC_URL + `/media/${imageData.item_id}` + imageData.image_path} />
                                </Grid>
                            </Grid>
                        )
                    }
                </Carousel>
            </Container>
            <Box component='div' textAlign='center' width='60%' margin='auto'>
                <Box component='div' p={4} >
                    {cardData.item_description}
                </Box>
                <Divider />
                <Grid container row>
                    <Grid item xs>
                        <Box component='div' textAlign='center' borderRight={1} p={3} fontWeight={600}>
                            Original Price: {cardData.original_price}
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box component='div' textAlign='center' borderLeft={1} borderColor='black' p={3} fontWeight={800} color='red'>
                            Current Price: {cardData.current_price}
                        </Box>
                    </Grid>
                </Grid>
                <Divider />
            </Box>
            <form noValidate autoComplete="off">
                <Box width='80%' margin='auto' p={4}>
                    <Grid container row spacing={1}>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Amount" variant="outlined" type='number' value={amount} onInput={e => updateAmount(e.target.value)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Full Name" variant="outlined" value={name} onInput={e => updateName(e.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Contact Info" variant="outlined" value={contact} onInput={e => updateContact(e.target.value)} />
                        </Grid>
                        <Box component='div' paddingTop={2} margin='auto'>
                            <Button type="submit" variant="contained" size='large' color="primary" disabled={isReady} onClick={e => handleSubmit(e)}>
                                Submit Bid
                            </Button>
                        </Box>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" onClick={e => test(e)}>
                        Test
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default ItemPage;