import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import customerService from "../../../service/customerService";
import UserCard from "../cards/userCard";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TicketPage from "../page/ticketPage";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import { Button, Grid } from "@material-ui/core";
import DeleteDialog from "../alertDialog/deleteDialog";


export class CustomerProfile extends Component {
  state = {
    userId: "",
    userName: "",
    user: {},
    tickets: {},
    openCancelBookingDialog: false,
    isExpanded: "",
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    if (!_.isNull(localStorage.getItem("username"))) {
      if (localStorage.getItem("role") !== "ROLE_CUSTOMER") {
        this.props.history.replace("/not-authorized");
      }
      const userName = localStorage.getItem("username");
      let user = {};
      customerService.getCustomerByUserName(userName).then((res) => {
        user = { userName: userName, ...res.data };
        this.setState({
          userId: res.data.id,
          userName,
          user,
          tickets: res.data.tickets,
        });
      });
    } else {
      toast("Not Logged In");
    }
  }

  handlePanel1 = (panel) => {
    this.state.isExpanded === panel
      ? this.setState({ isExpanded: false })
      : this.setState({ isExpanded: panel });
  };

  getPagedData = () => {
    const { pageSize, currentPage, tickets } = this.state;

    const filteredTickets = paginate(tickets, currentPage, pageSize);

    return { totalCount: _.size(tickets), data: filteredTickets };
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleTicketSelect = (ticket) => {
    console.log(ticket);
  };

  handleEdit = (user) => {
    this.props.history.push({
      pathname: `/customer/${user.id}/customer-form`,
      state: { user: user },
    });
  };

  handleCancelBooking = () => {
    this.setState({ openCancelBookingDialog: true });
  };

  handleCancellingDialogClose = () => {
    this.setState({ openCancelBookingDialog: false });
  };

  handleCancellingDialogClose = () => {
    const { tickets, userId } = this.state;
    this.props.history.push({
      pathname: `/customer/${userId}/cancel-booking`,
      state: { tickets: tickets },
    });
    this.setState({ openCancelBookingDialog: false });
  };

  render() {
    const {
      user,
      openCancelBookingDialog,
      tickets,
      pageSize,
      currentPage,
    } = this.state;
    const { totalCount, data: filteredTickets } = this.getPagedData();
    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        <DeleteDialog
          open={openCancelBookingDialog}
          title={`Proceed to booking cancellation?`}
          content={`Individual ticket cancellation is not allowed. All tickets related to particular show will get cancelled`}
          onCancel={this.handleCancellingDialogClose}
          onConfirm={this.handleCancellingDialogClose}
        />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}></Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            {!_.isEmpty(user) ? (
              <UserCard user={user} onEdit={this.handleEdit} />
            ) : (
              <h1></h1>
            )}
          </Grid>

          <Grid item xs={12}></Grid>
          <Grid item xs={8}>
            <Accordion
              style={{ marginTop: "20px" }}
              expanded={this.state.isExpanded === "panel1"}
              onChange={() => this.handlePanel1("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography>Booked Tickets</Typography>

                {/* <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  style={{ marginLeft: "20px" }}
                >
                  see all
                </Button> */}
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ flexGrow: "1", marginTop: "20px" }}>
                  <Grid container>
                    {!_.isEmpty(this.state.user) ? (
                      filteredTickets.map((ticket) => {
                        return (
                          <Grid
                            key={ticket.id}
                            item
                            xs={3}
                            onClick={() => this.handleTicketSelect(ticket)}
                          >
                            <TicketPage ticket={ticket} />
                          </Grid>
                        );
                      })
                    ) : (
                      <h1>No tickets</h1>
                    )}
                  </Grid>
                </div>
              </AccordionDetails>
              <AccordionDetails>
                <div>
                  <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={this.handleCancelBooking}
                  >
                    Cancel Booking
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CustomerProfile;
