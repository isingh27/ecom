import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import allActions from '../../../store/actions';
import Modal from '../../Modal/Modal';
import useStyles from './styles';

const Product = ({ id, title, price, description, category, thumbnail, qty }) => {
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        classes={{
          root: classes.media,
        }}
        image={thumbnail}
        title={title}
        onClick={() => setShowModal(!showModal)}
      />
      <CardContent className={classes.cardContent}>
        <Grid container align="center" spacing={1}>
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
              variant="outlined"
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={<ExpandMoreIcon />}
                aria-label="Toggle product description"
                title="Click to toggle description"
              >
                <Typography variant="h6" component="h2">
                  {title}
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails className={classes.accordion}>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="p"
                  color="textPrimary"
                  className={classes.description}
                  align="left"
                >
                  {description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={6}>
            <Typography
              gutterBottom
              variant="overline"
              component="p"
              // align="left"
              color="textPrimary"
            >
              {category}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              gutterBottom
              variant="h6"
              component="h3"
              // align="right"
              className={classes.price}
              title={price.toFixed(2)}
            >
              ${price.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label="Add to Cart"
          onClick={() =>
            dispatch(
              allActions.cartActions.addToCart(
                id,
                title,
                price,
                description,
                category,
                thumbnail,
                qty
              )
            )
          }
        >
          <Typography variant="button" display="block" color="textPrimary">
            Add to cart
          </Typography>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal} img={thumbnail} />
      )}
    </Card>
  );
};

export default Product;
