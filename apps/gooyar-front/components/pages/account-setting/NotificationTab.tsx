import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// components
import BlankCard from "../../shared/BlankCard";
import {
  alpha,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import useResponsive from "@/shared/hooks/useResponsive";
import {
  getAllNotificationsService,
  getUnreadNotificationsService,
  markAllAsReadService,
  markAllAsUnreadService,
  markAsReadService,
  markAsUnreadService,
} from "@/api/services/userServices";
import { fPersianDate } from "@/shared/helpers/formatTime";

const NotificationTab = () => {
  const isMdUp = useResponsive("up", "md");

  const [filter, setFilter] = useState(0); // 0 for "Unread", 1 for "All"

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setFilter(newValue);
    newValue === 0 && unreadNotifications?.length === 0
      ? getUnreadNotifications()
      : notifications?.length === 0
      ? getAllNotifications()
      : null;
  };

  const [notifications, setNotifications] = useState([]);

  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const getAllNotifications = async () => {
    try {
      const result = await getAllNotificationsService();
      if (result.success) {
        setNotifications(result.data);
      }
    } catch (error) {}
  };

  const getUnreadNotifications = async () => {
    try {
      const result = await getUnreadNotificationsService();
      if (result.success) {
        setUnreadNotifications(result.data);
      }
    } catch (error) {}
  };

  const handleMarkAllAsRead = async () => {
    try {
      const result = await markAllAsReadService();
      if (result.success) {
        getAllNotifications();
        getUnreadNotifications();
      }
    } catch (error) {}
  };

  const handleMarkAllAsUnread = async () => {
    try {
      // Assuming you have an API service to mark all as unread
      const result = await markAllAsUnreadService();
      if (result.success) {
        getAllNotifications();
        getUnreadNotifications();
      }
    } catch (error) {}
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const result = await markAsReadService(id);
      if (result.success) {
        getAllNotifications();
        getUnreadNotifications();
      }
    } catch (error) {}
  };

  const handleMarkAsUnread = async (id: string) => {
    try {
      const result = await markAsUnreadService(id);
      if (result.success) {
        getAllNotifications();
        getUnreadNotifications();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUnreadNotifications();
    getAllNotifications();
  }, []);

  const renderNotificationMenu = (
    <Tabs
      value={filter}
      onChange={handleTabChange}
      orientation={isMdUp ? "vertical" : "horizontal"}
      sx={{
        borderRight: isMdUp ? `1px solid ${alpha("#000", 0.12)}` : "none",
        marginBottom: !isMdUp ? 2 : 0,
        width: isMdUp ? 280 : "100%",
      }}
    >
      <Tab
        label={`خوانده نشده‌ها  (${unreadNotifications.length})`}
        sx={{ alignItems: "flex-start" }}
      />
      <Tab
        label={`همه پیام‌ها  (${notifications.length})`}
        sx={{ alignItems: "flex-start", mr: "0 !important" }}
      />
    </Tabs>
  );
  const renderedNotifications =
    filter === 1 ? notifications : unreadNotifications;

  return (
    <>
      <BlankCard>
        <CardContent>
          <Typography variant="h4" mb={2}>
            پیام‌ها
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: isMdUp ? "row" : "column",
              padding: 2,
            }}
          >
            {/* Right column - Menu */}
            <Box>{renderNotificationMenu}</Box>

            {/* Left column - Notifications list */}
            <Box sx={{ flexGrow: 1, paddingLeft: isMdUp ? 2 : 0 }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {filter === 1 ? "همه" : "خوانده نشده‌ها"}
              </Typography>

              {(filter === 1 && notifications?.length === 0) ||
              (filter === 0 && unreadNotifications?.length === 0) ? (
                <Typography variant="body2">پیامی یافت نشد.</Typography>
              ) : (
                <List>
                  {renderedNotifications.map((notification: any, index) => (
                    <div key={notification.id}>
                      <ListItem
                        sx={{
                          bgcolor: notification.read_at ? "white" : "grey.100",
                          borderRadius: 1,
                          marginBottom: 1,
                          flexDirection: { xs: "column", sm: "row" },
                          gap: 1,
                          alignItems: { xs: "flex-start", sm: "center" },
                        }}
                      >
                        <ListItemText
                          sx={{
                            mr: 3,
                          }}
                          primary={notification.data.message}
                          secondary={fPersianDate(
                            notification.data?.created_at
                          )}
                          primaryTypographyProps={{
                            variant: "subtitle1",
                            fontWeight: !notification.read_at
                              ? "bold"
                              : "normal",
                          }}
                          secondaryTypographyProps={{
                            variant: "caption",
                            fontWeight: "normal",
                          }}
                        />
                        {notification.read_at ? (
                          <Button
                            onClick={() => handleMarkAsUnread(notification.id)}
                            variant="text"
                            size="small"
                            sx={{
                              whiteSpace: "nowrap",
                            }}
                          >
                            خوانده نشود
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleMarkAsRead(notification.id)}
                            variant="text"
                            size="small"
                            sx={{
                              whiteSpace: "nowrap",
                            }}
                          >
                            خوانده شود
                          </Button>
                        )}
                      </ListItem>
                      {index < renderedNotifications?.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  ...(!isMdUp && {
                    flexDirection: "column",
                    gap: 2,
                    width: "fit-content",
                  }),
                }}
              >
                <Button variant="contained" onClick={handleMarkAllAsRead}>
                  همه خوانده شود
                </Button>
                <Button variant="outlined" onClick={handleMarkAllAsUnread}>
                  همه نخوانده شود
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </BlankCard>
    </>
  );
};

export default NotificationTab;
